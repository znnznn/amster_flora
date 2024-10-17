from django.conf.urls.static import static

from . import BASE_DIR, DEBUG, MIDDLEWARE

MIDDLEWARE.append('debug_toolbar.middleware.DebugToolbarMiddleware')

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
    },
}
MEDIA_URL = '/media/'
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'static'

static_urls = static(STATIC_URL, document_root=STATIC_ROOT)

INTERNAL_IPS = [
    # ...
    "127.0.0.1",
    # ...
]

if DEBUG:
    import socket  # only if you haven't already imported this

    hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
    INTERNAL_IPS = [ip[: ip.rfind(".")] + ".1" for ip in ips] + ["127.0.0.1", "10.0.2.2"]

DEBUG_TOOLBAR_PATCH_SETTINGS = False
