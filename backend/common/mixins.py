from django.db.models import QuerySet
from django.utils.encoding import force_str
from rest_framework.decorators import action


class ListWithOutPaginationMixin:
    """
    List without pagination
        - action = 'list_without_pagination'
    """

    @action(detail=False, url_path='all')
    def list_without_pagination(self, request, *args, **kwargs):
        self.pagination_class = None
        return self.list(request, *args, **kwargs)
