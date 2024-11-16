from django.db.models import QuerySet
from django_filters.rest_framework import FilterSet, CharFilter, BooleanFilter, NumberFilter

from common.filters import RelatedOrderingFilter
from products.models import Category


class CategoryFilter(FilterSet):
    only_parent = BooleanFilter(method='filter_by_only_parent', label='Only parent filter (top level)')
    level = NumberFilter(field_name='level', label='Level filter by tree level (0 - with parent)')
    ids = CharFilter(method='filter_by_ids', label='Ids filter by ids (comma separated)')

    class Meta:
        model = Category
        fields = ['name']

    @staticmethod
    def filter_by_only_parent(queryset: QuerySet, name: str, value: str) -> QuerySet:
        if value:
            return queryset.filter(parent=None)
        return queryset

    @staticmethod
    def filter_by_ids(queryset: QuerySet, name: str, value: str) -> QuerySet:
        ids = tuple(map(int, filter(str.isdigit, value.split(','))))
        return queryset.filter(id__in=ids)


class WishListFilter(FilterSet):
    name = CharFilter(field_name='product__name', lookup_expr='icontains')
    category = CharFilter(field_name='product__category__name', lookup_expr='icontains')


class WishListOrderingFilter(RelatedOrderingFilter):
    fields_related = {
        'name': 'product__name',
        "category": "product__category__name",
    }
