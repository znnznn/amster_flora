from django.db import models

from common.constants import PHONE_REGEX


class Shop(models.Model):
    name = models.CharField(max_length=255, unique=True)
    city = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=17, unique=True, null=True, blank=True, validators=[PHONE_REGEX])
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name