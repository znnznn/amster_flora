from django.urls import path

from payments.views import LiqpayCallbackView, TransactionListAPIView

urlpatterns = [
    path('callback-liqpay/', LiqpayCallbackView.as_view(), name="liqpay_callback"),
    path('transactions/', TransactionListAPIView.as_view(), name="transaction_list"),
]