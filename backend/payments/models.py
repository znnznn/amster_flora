from django.contrib.auth import get_user_model
from django.db import models

from common.constants import PaymentStatus, PaymentMethod


class Transaction(models.Model):
    creator = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, blank=True, null=True, related_name='transactions')
    title = models.CharField(max_length=200)
    status = models.CharField(max_length=200, choices=PaymentStatus.STATUS_CHOICE, default=PaymentStatus.ACTIVE)
    method = models.CharField(max_length=55, choices=PaymentMethod.PAYMENT_METHOD_CHOICE, default=PaymentMethod.LIQPAY)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    response = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title