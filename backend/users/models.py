from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models

from common.constants import Role, PHONE_REGEX
from .managers import UserManager


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    username = None
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=17, validators=[PHONE_REGEX], unique=True, null=True, blank=True)
    role = models.CharField(choices=Role.ROLE_CHOICES, default=Role.CLIENT, max_length=55)
    is_deleted = models.BooleanField(default=False)

    objects = UserManager()

    def __str__(self):
        return self.get_full_name()


class Message(models.Model):
    """ for contact us page """
    email = models.EmailField(max_length=254)
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=17, validators=[PHONE_REGEX], null=True, blank=True)
    text = models.CharField(max_length=1044)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    contacted = models.BooleanField(default=False)
    comment = models.CharField(max_length=1044, null=True, blank=True)

    def __str__(self):
        return self.text