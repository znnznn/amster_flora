from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from auth.serializers import GoogleOAuthLoginSerializer, FacebookOAuthLoginSerializer


class GoogleLoginAPIView(GenericAPIView):
    serializer_class = GoogleOAuthLoginSerializer

    def post(self, request, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)


class FacebookLoginAPIView(GenericAPIView):
    serializer_class = FacebookOAuthLoginSerializer

    def post(self, request, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)
