from zoneinfo import available_timezones

from django.db.models import QuerySet, F, Q
from django_filters.rest_framework import FilterSet, CharFilter, BooleanFilter, NumberFilter

from common.filters import RelatedOrderingFilter
from products.models import Category, Product, Variant


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

class ProductFilter(FilterSet):
    category = CharFilter(field_name='category__name', lookup_expr='icontains')
    categories = CharFilter(method='filter_by_category_ids')
    available = BooleanFilter(method='filter_by_available')
    shop = NumberFilter(field_name='shop__id')
    hex_color = CharFilter(field_name='variants__hex_color')

    class Meta:
        model = Product
        fields = ['name']

    def filter_by_category_ids(self, queryset: QuerySet, name: str, value: str) -> QuerySet:
        ids = tuple(map(int, filter(str.isdigit, value.split(','))))
        return queryset.filter(category__id__in=ids)

    def filter_by_available(self, queryset: QuerySet, name: str, value: str) -> QuerySet:
        available_variants = Variant.objects.filter(quantity__gt=0).values_list('product__id', flat=True)
        if value:
            return queryset.filter(Q(id__in=available_variants))
        return queryset.filter(~Q(id__in=available_variants))


class ProductOrderingFilter(RelatedOrderingFilter):
    fields_related = {
        "category": "product__category__name",
        "price": "variants__price",
        "height": "variants__height",
        "diameter": "variants__diameter",
    }
    default_ordering = ['name', ]
