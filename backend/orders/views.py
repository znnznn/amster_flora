from django.db.models import Prefetch
from rest_framework.viewsets import ModelViewSet

from orders.models import Cart
from orders.serializers import CartSerializer, CartListSerializer
from products.models import Variant
from users.permissions import IsCreator


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
