from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models

from amster_flora.backend.common.constants import Role
from amster_flora.backend.users.managers import UserManager


class User(AbstractUser):
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    username = None
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=17, validators=[phone_regex], unique=True, null=True, blank=True)
    role = models.CharField(choices=Role.ROLE_CHOICES, default=Role.CLIENT, max_length=55)
    company = models.CharField(max_length=255, null=True, blank=True)
    position = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    is_deleted = models.BooleanField(default=False)

    objects = UserManager()

    def __str__(self):
        return self.get_full_name()
