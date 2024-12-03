from django.db.models import Prefetch
from rest_framework.viewsets import ModelViewSet

from amster_flora.doc_api import OrderDocAPIView, OrderItemDocAPIView
from common.constants import Role
from orders.models import Cart, Order, OrderItem
from orders.serializers import CartSerializer, CartListSerializer, OrderCreateSerializer, OrderListSerializer, OrderItemSerializer
from products.models import Variant
from users.permissions import IsCreator, IsAuthenticatedAs


class CartsViewSet(ModelViewSet):
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
        variant.quantity_sold -= instance.amount
        variant.save()
        order.save()
        instance.delete()
