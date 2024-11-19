from django.urls import path

from auth.views import GoogleLoginAPIView, FacebookLoginAPIView

urlpatterns = [
    path('auth/google/', GoogleLoginAPIView.as_view(), name="google_login"),
    path('auth/facebook/', FacebookLoginAPIView.as_view(), name="facebook_login"),
]
