from django.db import models


class KeyCRMProduct(models.Model):
    """ Product from KeyCRM """
    key_crm_id = models.PositiveIntegerField(unique=True)
    name = models.CharField(max_length=256)
    description = models.TextField(null=True, blank=True)
    thumbnail_url = models.URLField(max_length=1044, null=True, blank=True)
    sku = models.CharField(max_length=256, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    purchased_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    quantity = models.PositiveIntegerField(default=0)
    currency_code = models.CharField(max_length=3, null=True, blank=True)
    weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    length = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    width = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    height = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)