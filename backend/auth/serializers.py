from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from amster_flora.settings import GOOGLE_AUTH_CLIENT_ID
from common.constants import Role
from users.models import User
from users.serializers import UserListSerializer


class GoogleOAuthLoginSerializer(serializers.Serializer):
    token = serializers.CharField()

    def validate(self, attrs):
        try:
            idinfo = id_token.verify_oauth2_token(attrs.get('token'), requests.Request(), GOOGLE_AUTH_CLIENT_ID)
        except ValueError:
            raise serializers.ValidationError({'message': ['Невірний токен']})
        user = User.objects.filter(email=idinfo.get('email')).first()
        if not user:
            user_data = {
                'first_name': idinfo.get('given_name'),
                'last_name': idinfo.get('family_name'),
                'email': idinfo.get('email'),
                'role': Role.CLIENT,
                'is_active': True
            }
            user = User.objects.create_user(**user_data)
        return_attrs = {}
        token_class = RefreshToken
        refresh = token_class.for_user(user)
        return_attrs['refresh'] = str(refresh)
        return_attrs['access'] = str(refresh.access_token)
        return_attrs['user'] = UserListSerializer(user).data
        return return_attrs

    def to_representation(self, instance):
        return instance