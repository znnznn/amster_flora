from django.urls import path

from payments.views import LiqpayCallbackView

urlpatterns = [
    path('callback-liqpay/', LiqpayCallbackView.as_view(), name="liqpay_callback"),
]