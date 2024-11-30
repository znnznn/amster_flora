from django.db import models

from products.models import Variant
from users.models import User


class Cart(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='carts')
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE, related_name='carts')
    amount = models.PositiveIntegerField(default=0)
    position = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
