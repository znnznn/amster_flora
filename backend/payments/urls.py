from django.urls import path

from payments.views import LiqpayCallbackView, TransactionListAPIView, WayForPayView

urlpatterns = [
    path('callback-liqpay/', LiqpayCallbackView.as_view(), name="liqpay_callback"),
    path('callback-wayforpay/', WayForPayView.as_view(), name="wayforpay_callback"),
    path('transactions/', TransactionListAPIView.as_view(), name="transaction_list"),
]