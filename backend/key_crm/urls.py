from django.urls import path

from key_crm.views import KeyCRMProductsView

urlpatterns = [
    path('products/', KeyCRMProductsView.as_view()),
]