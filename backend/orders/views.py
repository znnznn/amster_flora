from django.db.models import Prefetch
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from amster_flora.doc_api import OrderDocAPIView, OrderItemDocAPIView, CartDocAPIView
from common.constants import Role
from orders.models import Cart, Order, OrderItem
from orders.serializers import CartSerializer, CartListSerializer, OrderCreateSerializer, OrderListSerializer, OrderItemSerializer
from products.models import Variant
from users.permissions import IsCreator, IsAuthenticatedAs


class CartsViewSet(ModelViewSet):
    swagger_schema = CartDocAPIView
    queryset = Cart.objects.prefetch_related(
        Prefetch('variant', Variant.objects.select_related('product').prefetch_related('images'))
    )
    serializer_class = CartSerializer
    permission_classes = (IsCreator,)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CartListSerializer
        return CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(creator=self.request.user)

    @action(detail=True, methods=['delete'], url_path='delete')
    def delete_by_variant(self, request, *args, **kwargs):
        cart_product = get_object_or_404(self.get_queryset().filter(variant_id=kwargs['pk']), creator=request.user)
        cart_product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OrdersViewSet(ModelViewSet):
    swagger_schema = OrderDocAPIView
    queryset = Order.objects.select_related('creator', 'address').prefetch_related(
        Prefetch('orders_items', queryset=OrderItem.objects.select_related('variant', 'variant__product'))
    )
    permission_classes = (IsAuthenticatedAs(Role.ADMIN, Role.MANAGER) | IsCreator,)
    serializer_class = OrderCreateSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return OrderListSerializer
        return OrderCreateSerializer

    def get_queryset(self):
        filter_kwargs = {}
        if self.request.user.is_authenticated and self.request.user.role == Role.CLIENT:
            filter_kwargs['creator'] = self.request.user
        return super().get_queryset().filter(**filter_kwargs)


class OrderItemsViewSet(ModelViewSet):
    swagger_schema = OrderItemDocAPIView
    queryset = OrderItem.objects.select_related('order', 'variant')
    serializer_class = OrderItemSerializer
    permission_classes = (IsAuthenticatedAs(Role.ADMIN, Role.MANAGER),)

    def perform_destroy(self, instance):
        order = instance.order
        variant = instance.variant
        if order and instance.discount:
            order.discount -= instance.discount
        variant.quantity += instance.amount
        variant.save()
        order.save()
        instance.delete()
