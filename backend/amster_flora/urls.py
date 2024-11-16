from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from users.views import UserViewSet, ContactUsAPIView, customer_page
from .settings import ENVIRONMENT

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('contact-us', ContactUsAPIView)


urlpatterns = [
    # path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('', include(router.urls)),
    path('facebook/', customer_page),
    path('', include('auth.urls'), name="social-login"),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_create'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('amster_flora.doc_api')),
    path("__debug__/", include("debug_toolbar.urls")),
]

if ENVIRONMENT == 'local':
    from .settings import static_urls

    urlpatterns += static_urls
