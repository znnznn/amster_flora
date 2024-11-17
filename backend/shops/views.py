from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.viewsets import ModelViewSet

from amster_flora.doc_api import ShopsDocAPIView
from common.constants import Role
from shops.models import Shop
from shops.serializers import ShopSerializer
from users.permissions import IsAuthenticatedAs


class ShopsViewSet(ModelViewSet):
    swagger_schema = ShopsDocAPIView
    serializer_class = ShopSerializer
    permission_classes = (IsAuthenticatedAs(Role.ADMIN, ),)
    queryset = Shop.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    ordering_fields = ("city", "name")
    search_fields = ("name", "city")
    filterset_fields = ("name", "city")