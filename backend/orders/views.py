from rest_framework.viewsets import ModelViewSet

from orders.models import Cart
from orders.serializers import CartSerializer
from users.permissions import IsCreator


class CartsViewSet(ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = (IsCreator,)

    def get_queryset(self):
        return Cart.objects.filter(creator=self.request.user)
