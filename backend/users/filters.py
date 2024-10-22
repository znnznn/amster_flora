from django.db.models import QuerySet
from django_filters.rest_framework import FilterSet, BooleanFilter, CharFilter

from users.models import User


class UserFilter(FilterSet):
    role = CharFilter(method="filter_by_role", label="Coma separated Role")
    is_deleted = BooleanFilter(label="Is Deleted")

    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "is_active", "phone_number")

    @staticmethod
    def filter_by_role(queryset: QuerySet, role: str, value: str) -> QuerySet:
        return queryset.filter(role__in=value.split(','))