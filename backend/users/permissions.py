from rest_framework.permissions import IsAuthenticated, OperationHolderMixin, SAFE_METHODS


class IsAuthenticatedAs(IsAuthenticated, OperationHolderMixin):
    def __init__(self, *roles):
        self.__roles = roles

    def __call__(self):
        return self

    def has_permission(self, request, view):
        return bool(
            super().has_permission(request, view) and request.user.role in self.__roles
        )


class IsOwner(IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return bool(super().has_permission(request, view) and obj == request.user)


class IsCreator(IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return bool(super().has_permission(request, view) and obj.creator == request.user)


class IsSafeMethod(IsAuthenticated):
    def has_permission(self, request, view):
        return bool(request.method in SAFE_METHODS)
