from rest_framework.filters import OrderingFilter


class RelatedOrderingFilter(OrderingFilter):
    """ Ordering filter with custom related fields
      needs attribute:
        - fields_related dictionary
    """
    fields_related = {"renamed_model_field": "model_field"}
    default_ordering = []

    def remove_invalid_fields(self, queryset, fields, view, request):
        valid_fields = [item[0] for item in self.get_valid_fields(queryset, view, {'request': request})]

        def term_valid(term):
            if term.startswith("-"):
                term = term[1:]
            return term in valid_fields

        def get_field(field):
            symbol = ""
            if field.startswith("-"):
                field = field[1:]
                symbol = '-'
            return symbol + self.fields_related.get(field, field)

        return [get_field(term) for term in fields if term_valid(term)] + self.default_ordering