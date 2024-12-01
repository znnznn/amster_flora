from django.db.models import QuerySet
from django_filters import NumberFilter
from django_filters.rest_framework import FilterSet, BooleanFilter, CharFilter

from users.models import User, DeliveryAddress


class UserFilter(FilterSet):
    role = CharFilter(method="filter_by_role", label="Coma separated Role")
    is_deleted = BooleanFilter(label="Is Deleted")

    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "is_active", "phone_number")

    @staticmethod
    def filter_by_role(queryset: QuerySet, role: str, value: str) -> QuerySet:
        return queryset.filter(role__in=value.split(','))


class DeliveryAddressFilter(FilterSet):
    creator = NumberFilter(field_name="creator__id", label="User ID")

    class Meta:
        model = DeliveryAddress
        fields = ("creator__first_name", "creator__last_name", "city",)
