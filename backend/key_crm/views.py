from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListAPIView

from common.constants import Role
from key_crm.models import KeyCRMProduct
from key_crm.serializers import KeyCRMProductSerializer
from users.permissions import IsAuthenticatedAs


class KeyCRMProductsView(ListAPIView):
    queryset = KeyCRMProduct.objects.all()
    serializer_class = KeyCRMProductSerializer
    permission_classes = (IsAuthenticatedAs(Role.ADMIN, Role.MANAGER),)
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ("name",)
    search_fields = ("name", "description")
    ordering_fields = ("name",)