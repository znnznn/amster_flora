from django.db.models import Prefetch
from rest_framework.viewsets import ModelViewSet

from common.constants import Role
from orders.models import Cart, Order, OrderItem
from orders.serializers import CartSerializer, CartListSerializer, OrderCreateSerializer, OrderListSerializer
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
