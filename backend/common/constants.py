

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
