from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.models import update_last_login
from django.contrib.auth.tokens import default_token_generator
from django.core import exceptions
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from drf_yasg.utils import swagger_serializer_method
from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken

from common.constants import Role
from users.models import Message
from users.utils import EmailSender

User = get_user_model()


class UserSerializer(serializers.ModelSerializer, EmailSender):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            'id', 'email', 'first_name', 'last_name', 'phone_number', 'role', 'password', 'last_login',
        )
        read_only_fields = ('last_login',)
        extra_kwargs = {
            "phone_number": {"required": True},
        }

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")
        if request and request.user.is_authenticated and request.user.role != Role.CLIENT:
            fields['is_active'] = serializers.BooleanField(default=False)
            fields['is_deleted'] = serializers.BooleanField(default=False)
        return fields

    def create(self, validated_data):
        request_user = self.context.get("request").user
        if not request_user.is_authenticated or request_user.role == Role.CLIENT:
            validated_data['role'] = Role.CLIENT
        if request_user.is_authenticated and request_user.role == Role.MANAGER:
            if validated_data.get('role') == Role.ADMIN:
                raise PermissionDenied()

        errors = {}
        try:
            password_validation.validate_password(password=validated_data.get('password'))
        except exceptions.ValidationError as exp:
            errors['password'] = list(exp.messages)
        if errors:
            raise serializers.ValidationError(errors)

        user = User.objects.create_user(**validated_data)
        self.send_email_new_user(request=self.context.get('request'), obj_user=user)
        return user

    def update(self, instance, validated_data):
        if validated_data.get('role') and self.context.get('request').user.role != Role.ADMIN:
            raise PermissionDenied()
        if validated_data.get('password'):
            del validated_data['password']
        if validated_data.get('is_active') and not instance.is_active:
            self.send_email_invite_new_user(request=self.context.get('request'), obj_user=instance)
        return super().update(instance, validated_data)


class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id', 'email', 'first_name', 'last_name', 'phone_number', 'role', 'is_active',
            'last_login',
        )


class LoginSerializer(TokenObtainSerializer):
    token_class = RefreshToken   # RefreshToken.for_user(self.user)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields[self.username_field] = serializers.EmailField()

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)
        data['user'] = UserListSerializer(self.user).data

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


class PasswordResetSerializer(serializers.Serializer, EmailSender):
    email = serializers.EmailField()

    def validate(self, attrs):
        user = User.objects.filter(email=attrs.get('email')).first()
        if user:
            self.send_email_reset_password(request=self.context['request'], obj_user=user)
        return attrs


class SetPasswordSerializer(serializers.Serializer):
    new_password1 = serializers.CharField()
    new_password2 = serializers.CharField()
    token = serializers.CharField()
    uidb64 = serializers.CharField()

    class Meta:
        fields = ['new_password1', 'new_password2', 'token', 'uidb64']

    def validate(self, attrs):
        new_password1 = attrs.get('new_password1')

        try:
            user_id = force_str(urlsafe_base64_decode(attrs.get('uidb64')))
            user = User.objects.get(id=user_id)
        except Exception as exp:
            raise AuthenticationFailed('Ссилка не діюча', 401) from exp
        if not default_token_generator.check_token(user, attrs.get('token')):
            raise exceptions.ValidationError({'message': ['Не правильний токен']})
        if new_password1 != attrs.get('new_password2'):
            raise serializers.ValidationError({'new_password2': ["Паролі не співпадають"]})

        errors = {}
        try:
            password_validation.validate_password(password=new_password1)
        except exceptions.ValidationError as exp:
            errors['new_password1'] = list(exp.messages)
        if errors:
            raise serializers.ValidationError(errors)

        user.set_password(new_password1)
        user.is_active = True
        user.save()
        return attrs


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password1 = serializers.CharField()
    new_password2 = serializers.CharField()

    def validate(self, attrs):
        user = self.context['request'].user

        if not user.check_password(attrs.get("old_password")):
            raise ValidationError({"old_password": "Старий пароль невірний."})
        if attrs.get("new_password1") != attrs.get("new_password2"):
            raise ValidationError({"new_password2": "Паролі не співпадають"})

        errors = {}
        try:
            password_validation.validate_password(password=attrs.get("new_password1"))
        except exceptions.ValidationError as error:
            errors['new_password1'] = list(error.messages)
        if errors:
            raise serializers.ValidationError(errors)

        user.set_password(attrs.get('new_password1'))
        user.save()
        return attrs


class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'name', 'email', 'phone_number', 'text', 'is_read', 'contacted', 'created_at', 'comment')

    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")
        if request and not request.user.is_authenticated:
            del fields['is_read']
            del fields['comment']
        return fields
