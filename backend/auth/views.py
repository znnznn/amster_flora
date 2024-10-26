from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from auth.serializers import SocialAccountLoginSerializer


class GoogleLoginAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = SocialAccountLoginSerializer

    def post(self, request, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(status=status.HTTP_200_OK)