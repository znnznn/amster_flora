from django.db import models
from mptt.fields import TreeForeignKey
from mptt.models import MPTTModel

from common.constants import Size
from key_crm.models import KeyCRMProduct
from shops.models import Shop
from users.models import User


class Category(MPTTModel):
    name = models.CharField(max_length=255, unique=True)
    parent = TreeForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='children')

    class MPTTMeta:
        order_insertion_by = ['name']

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=255, unique=True)
    description = models.CharField(max_length=1044, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    is_visible = models.BooleanField(default=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name='products')


class Variant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    size = models.CharField(choices=Size.SIZE_CHOICES, max_length=255, blank=True, null=True)
    height = models.PositiveSmallIntegerField(default=0)
    diameter = models.PositiveSmallIntegerField(default=0)
    hex_color = models.CharField(max_length=255, null=True, blank=True, default='#000000')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)
    quantity_sold = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='images/', null=True, blank=True)


class Image(models.Model):
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='images/')

    def delete(self, using=None, keep_parents=False):
        super().delete(using, keep_parents)
        if self.image:
            self.image.storage.delete(str(self.image.name))

    def save(self, *args, force_insert=False, force_update=False, using=None, update_fields=None):
        if self.pk:
            old_instance = Image.objects.values('image').get(pk=self.pk)
            if old_instance.get('image') and old_instance.get('image') != self.image:
                self.image.storage.delete(str(old_instance.get('image')))
        super().save(force_insert, force_update, using, update_fields)


class WishList(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='wish_list')
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['product', 'creator'], name='wish_list_constraint',
                violation_error_message='This product is already in this storage')
        ]


class Component(models.Model):
    """ Use for flower composition """
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE, related_name='components')
    key_crm_product = models.ForeignKey(KeyCRMProduct, on_delete=models.CASCADE, related_name='components', null=True, blank=True)
    quantity = models.PositiveIntegerField(default=0)
