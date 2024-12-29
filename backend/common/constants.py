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


class OrderStatus:
    PENDING = "pending"
    APPROVAL = "approval"
    PAID = "paid"
    DELIVERED = "delivered"
    SHIPPED = "shipped"
    CANCELED = "canceled"

    CHOICES = [
        (PENDING, "pending"),
        (APPROVAL, "approval"),
        (PAID, "paid"),
        (DELIVERED, "delivered"),
        (SHIPPED, "shipped"),
        (CANCELED, "canceled"),
    ]

    UKRAINIAN = {
        PENDING: "В очікуванні",
        APPROVAL: "Погоджено",
        PAID: "Оплачено",
        DELIVERED: "Доставлено",
        SHIPPED: "Відвантажно",
        CANCELED: "Відмінено",
    }

class PaymentStatus:
    ACTIVE = "active"
    PAYED = "payed"
    UNSUCCESSFUL = "unsuccessful"

    STATUS_CHOICE = (
        (ACTIVE, 'Active'),
        (PAYED, 'Payed'),
        (UNSUCCESSFUL, 'Unsuccessful'),
    )


class PaymentMethod:
    LIQPAY = "liqpay"
    WAYFORPAY = "wayforpay"

    PAYMENT_METHOD_CHOICE = (
        (LIQPAY, 'Liqpay'),
        (WAYFORPAY, 'Wayforpay'),
    )
