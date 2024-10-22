from django.urls import path

from users.views import ResetPasswordAPIView, SetPasswordAPIView, ChangePasswordAPIView

urlpatterns = [
    path('password-reset/', ResetPasswordAPIView.as_view(), name="password_reset"),
    path('password-reset-confirm/<uidb64>/<token>/', SetPasswordAPIView.as_view(), name='password_reset_confirm'),
    path("<int:pk>/password-change/", ChangePasswordAPIView.as_view(), name="password_change"),
]
