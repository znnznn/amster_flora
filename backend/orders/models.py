from django.db import models

from common.constants import OrderStatus
from payments.models import Transaction
from products.models import Variant
from users.models import User, DeliveryAddress


class Cart(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='carts')
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE, related_name='carts')
    amount = models.PositiveIntegerField(default=0)
    position = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)


class Order(models.Model):
    status = models.CharField(max_length=255, choices=OrderStatus.CHOICES, default=OrderStatus.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    payment = models.ForeignKey(Transaction, on_delete=models.SET_NULL, blank=True, null=True, related_name='orders')
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    address = models.ForeignKey(DeliveryAddress, blank=True, null=True, on_delete=models.SET_NULL, related_name='orders')

    def __str__(self):
        return f'{self.pk} - {self.status}'


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='orders_items')
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE, related_name='orders_items')
    amount = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders_items')
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    percentage = models.IntegerField(default=0)
    position = models.IntegerField(default=0)
