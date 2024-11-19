from django.db.models import Prefetch
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from amster_flora.doc_api import UsersDocAPIView, ContactUsDocAPIView

from common.constants import Role
from users.filters import UserFilter
from users.models import User, Message
from users.permissions import IsAuthenticatedAs, IsOwner, IsOwnerProfile
from users.serializers import (
    UserSerializer, PasswordResetSerializer, SetPasswordSerializer, PasswordChangeSerializer, ContactUsSerializer, UserListSerializer
)


class UserViewSet(viewsets.ModelViewSet):
    swagger_schema = UsersDocAPIView
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticatedAs(Role.ADMIN, Role.MANAGER) | IsOwner,)
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = UserFilter
    ordering_fields = ('first_name', 'last_name', 'email', 'role', 'is_active', 'city', 'date_joined')
    search_fields = ('first_name', 'last_name', 'email',)
    ordering = ('-date_joined',)

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        if self.action in ('list', 'list_deleted'):
            return [IsAuthenticatedAs(Role.ADMIN, Role.MANAGER)()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action in ('list', 'retrieve', 'list_deleted'):
            return UserListSerializer
        return UserSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['action'] = self.action
        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        filter_kwargs = {'is_deleted': False}
        if self.action == 'list_deleted':
            filter_kwargs['is_deleted'] = True
        if self.action == 'partial_update':
            del filter_kwargs['is_deleted']
        return queryset.filter(**filter_kwargs)

    @action(detail=False, url_path='deleted')
    def list_deleted(self, request, *args, **kwargs):
        return super().list(request, args, kwargs)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.is_deleted = True
        instance.save()


class ResetPasswordAPIView(generics.GenericAPIView):
    swagger_schema = UsersDocAPIView
    serializer_class = PasswordResetSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message": "We send link. Check your email"}, status=status.HTTP_200_OK)


class SetPasswordAPIView(generics.GenericAPIView):
    swagger_schema = UsersDocAPIView
    serializer_class = SetPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message": "Your password has changed"}, status=status.HTTP_200_OK)


class ChangePasswordAPIView(GenericAPIView):
    permission_classes = (IsOwner,)
    serializer_class = PasswordChangeSerializer
    swagger_schema = UsersDocAPIView
    queryset = User.objects.all()

    def post(self, request, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(status=status.HTTP_200_OK)


class ContactUsAPIView(viewsets.ModelViewSet):
    swagger_schema = ContactUsDocAPIView
    serializer_class = ContactUsSerializer
    permission_classes = (IsAuthenticatedAs(Role.ADMIN, Role.MANAGER),)
    queryset = Message.objects.all()

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return super().get_permissions()

def customer_page(request):
    print(request.user)
    print(request.GET.dict())
    return render(request, "i3.html", {})
