from django.core.validators import RegexValidator

PHONE_REGEX = RegexValidator(
    regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
)


class Role:
    ADMIN = "admin"
    MANAGER = "manager"
    CLIENT = "client"

    ROLE_CHOICES = [
        (ADMIN, "admin"),
        (MANAGER, "manager"),
        (CLIENT, "client"),
    ]

    ROLE_UKRAINIAN = {
        ADMIN: "Адміністратор",
        MANAGER: "Менеджер",
        CLIENT: "Клієнт",
    }


class Size:
    SMALL = "small"
    MEDIUM = "medium"
    LARGE = "large"
    EXTRA_LARGE = "extra_large"

    SIZE_CHOICES = [
        (SMALL, "small"),
        (MEDIUM, "medium"),
        (LARGE, "large"),
        (EXTRA_LARGE, "extra_large"),
    ]
