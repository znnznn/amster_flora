from django.db.models import ProtectedError, Prefetch, F, Q, BooleanField, Value, OuterRef, Exists
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from amster_flora.doc_api import CategoriesDocAPIView, WishListDocAPIView, ProductDocAPIView
from common.constants import Role
from common.mixins import ListWithOutPaginationMixin
from orders.models import Cart
from products.filters import CategoryFilter, WishListFilter, WishListOrderingFilter, ProductOrderingFilter, ProductFilter
from products.models import Category, Product, WishList, Variant
from products.serializers import (
    CategorySerializer, CategoryTreeSerializer, CategoryRetrieveSerializer, WishListCreateSerializer, VariantCreateSerializer,
    ProductCreateSerializer, ProductListSerializer, VariantRetrieveSerializer
)
from users.permissions import IsAuthenticatedAs, IsSafeMethod


class CategoriesViewSet(ModelViewSet, ListWithOutPaginationMixin):
    swagger_schema = CategoriesDocAPIView
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticatedAs(Role.ADMIN, Role.MANAGER, ) | IsSafeMethod,)
    queryset = Category.objects.all().prefetch_related("children")
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = CategoryFilter
    ordering_fields = ("name",)
    search_fields = ("name",)

    def get_serializer_class(self):
        if self.action in ('list', 'node_children', 'list_without_pagination'):
            return CategoryTreeSerializer
        if self.action == 'retrieve':
            return CategoryRetrieveSerializer
        return CategorySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.action == 'root_nodes':
            queryset = queryset.filter(parent=None)
        return queryset

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.parent:
            parent_category = Category.objects.filter(id=instance.parent_id).first()
            products = Product.objects.filter(category=instance)
            for product in products:
                product.category = parent_category
            Product.objects.bulk_update(products, ['category'])
        try:
            self.perform_destroy(instance)
        except ProtectedError as exp:
            return Response(status=status.HTTP_423_LOCKED, data={'detail': "Заборонено видаляти категорію з товарами."})
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'], url_path='root-nodes')
    def root_nodes(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @action(detail=True, methods=['get'], url_path='children')
    def node_children(self, request, *args, **kwargs):
        instance = self.get_object()
        queryset = instance.get_descendants(include_self=False)
        return Response(self.get_serializer(queryset, many=True).data)


class WishListViewSet(ModelViewSet):
    swagger_schema = WishListDocAPIView
    serializer_class = WishListCreateSerializer
    permission_classes = (IsAuthenticatedAs(Role.ADMIN, Role.MANAGER, Role.CLIENT),)
    queryset = WishList.objects.select_related("product", "creator").prefetch_related("product__images")
    filter_backends = [DjangoFilterBackend, SearchFilter, WishListOrderingFilter]
    filterset_class = WishListFilter
    ordering_fields = ("name", "category")
    search_fields = ("product__name",)

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.role == Role.CLIENT:
            return queryset.filter(creator=self.request.user)
        return queryset

    @action(detail=True, methods=['delete'], url_path='delete')
    def delete_by_shop_product(self, request, *args, **kwargs):
        wish_product = get_object_or_404(self.get_queryset().filter(product_id=kwargs['pk']), creator=request.user)
        wish_product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class VariantsViewSet(ModelViewSet):
    serializer_class = VariantCreateSerializer
    permission_classes = (IsAuthenticatedAs(Role.ADMIN, Role.MANAGER, ) | IsSafeMethod,)
    queryset = Variant.objects.select_related("product", "product__category").prefetch_related("images")

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return VariantRetrieveSerializer
        return VariantCreateSerializer


class ProductsViewSet(ModelViewSet):
    swagger_schema = ProductDocAPIView
    serializer_class = ProductCreateSerializer
    permission_classes = (IsAuthenticatedAs(Role.ADMIN, Role.MANAGER, ) | IsSafeMethod,)
    queryset = Product.objects.select_related("category", "shop").prefetch_related("variants", "variants__images")
    filter_backends = [DjangoFilterBackend, SearchFilter, ProductOrderingFilter]
    filterset_class = ProductFilter
    ordering_fields = ("name", "category", "price", "height", "diameter",)
    search_fields = ("name",)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProductListSerializer
        return ProductCreateSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        annotation_kwargs = {
            "in_wish_list": Value(False, output_field=BooleanField()), "in_cart": Value(False, output_field=BooleanField())
        }
        if not self.request.user.is_authenticated or self.request.user.role == Role.CLIENT:
            available_variants = Variant.objects.filter(quantity__gt=F('quantity_sold')).values_list('product__id', flat=True)
            queryset = queryset.filter(Q(id__in=available_variants))
        if self.request.user.is_authenticated:
            annotation_kwargs["in_wish_list"] = Exists(WishList.objects.filter(product=OuterRef("id"), creator=self.request.user))
            annotation_kwargs["in_cart"] = Exists(Cart.objects.filter(variant__product=OuterRef("id"), creator=self.request.user))
        return queryset.annotate(**annotation_kwargs).distinct()
