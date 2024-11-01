from django.urls import path

from auth.views import GoogleLoginAPIView

urlpatterns = [
    path('auth/google/', GoogleLoginAPIView.as_view(), name="google_login"),
]
