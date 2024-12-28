from datetime import timedelta
from email.policy import default
from pathlib import Path
from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')


DEBUG = config('DEBUG', default=False, cast=bool)

ALLOWED_HOSTS = [
    "*",
]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # third party
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'drf_yasg',
    'debug_toolbar',
    'django_celery_results',

    # own apps
    'users',
    'products',
    'shops',
    'key_crm',
    'orders',
    'payments',
]

AUTH_USER_MODEL = "users.User"


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'amster_flora.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'amster_flora.wsgi.application'


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT', default=5432, cast=int),
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'uk'

TIME_ZONE = 'Europe/Kiev'

USE_I18N = True

USE_L10N = True

USE_TZ = True


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

ADMIN_SITE_HEADER = "Amster Flora administration"
ADMIN_SITE_TITLE = "Amster Flora"

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.redis.RedisCache",
        "LOCATION": config('REDIS_URL', default='redis://redis:6379'),
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
    'DEFAULT_RENDERER_CLASSES': ('rest_framework.renderers.JSONRenderer',),
    'PAGE_SIZE': 10,
    'TEST_REQUEST_DEFAULT_FORMAT': 'json',
}

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

ACCESS_TOKEN_LIFETIME = config('ACCESS_TOKEN_LIFETIME', default=1440, cast=int)

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=ACCESS_TOKEN_LIFETIME),
    'REFRESH_TOKEN_LIFETIME': timedelta(weeks=1),
    'UPDATE_LAST_LOGIN': True,
    'TOKEN_OBTAIN_SERIALIZER': 'users.serializers.LoginSerializer',
}


SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': {
        'Bearer': {
            'type': 'apiKey',
            'name': 'Authorization',
            'in': 'header'
        }
    },
    'USE_SESSION_AUTH': False,
}

EMAIL_HOST_USER = config('EMAIL_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_PASSWORD', default='')
EMAIL_HOST = config('EMAIL_HOST', default='')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_SSL = config('EMAIL_USE_SSL', default=False, cast=bool)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)

CORS_ORIGIN_ALLOW_ALL = True

FE_URL = config('FE_URL', default='localhost:3000')
GOOGLE_AUTH_CLIENT_ID = config('GOOGLE_AUTH_CLIENT_ID', default='')
GOOGLE_AUTH_CLIENT_SECRET = config('GOOGLE_AUTH_CLIENT_SECRET', default='')

KEY_CRM_API_KEY = config('KEY_CRM_API_KEY', default='')
KEY_CRM_SOURCE_ID = config('KEY_CRM_SOURCE_ID', default=8)
KET_CRM_URL = config('KEY_CRM_URL', default='https://openapi.keycrm.app/v1')

CELERY_RESULT_BACKEND = 'django-db'
CELERY_RESULT_EXTENDED = True
CELERY_BROKER_URL = config('REDIS_URL', default='redis://redis:6379')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'

LIQPAY_PUBLIC_KEY = config('LIQPAY_PUBLIC_KEY', default='')
LIQPAY_PRIVATE_KEY = config('LIQPAY_PRIVATE_KEY', default='')

WAYFORPAY_MERCHANT_LOGIN = config('WAYFORPAY_MERCHANT_LOGIN', default='')
WAYFORPAY_SECRET_KEY = config('WAYFORPAY_SECRET_KEY', default='')
