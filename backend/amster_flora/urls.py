from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .settings import ENVIRONMENT

router = DefaultRouter()


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('users.urls')),
    path('api/v1/', include(router.urls)),
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_create'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/', include('amster_flora.doc_api')),
    path("__debug__/", include("debug_toolbar.urls")),
]

if ENVIRONMENT == 'local':
    from .settings import static_urls

    urlpatterns += static_urls
