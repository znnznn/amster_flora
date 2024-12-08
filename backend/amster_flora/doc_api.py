from django.urls import path
from drf_yasg import openapi
from drf_yasg.inspectors import SwaggerAutoSchema
from drf_yasg.views import get_schema_view

schema_view = get_schema_view(
    openapi.Info(
        title="Amster Flora API",
        default_version="v1.0",
        description="Documentation",
        terms_of_service="https://www.google.com/policies/terms/",
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[],
)

urlpatterns = [
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]


class UsersDocAPIView(SwaggerAutoSchema):
    def get_operation(self, operation_keys=None):
        operation = super().get_operation(operation_keys)
        if operation['operationId'] == 'users_list':
            operation['summary'] = 'Get list of users'
            operation['description'] = """
                                                      Allowed only admin
                        .                                            
                        """
        elif operation['operationId'] == 'users_create':
            operation['summary'] = 'Create a new user'
            operation['description'] = """
                                                      Allowed only admin
                        .                                            
                        """
        elif operation['operationId'] == 'users_password-reset-confirm_create':
            operation['summary'] = 'Change password by uuid'
            operation['description'] = """
                                                      Allowed All users
                                                      needs params:
                                                          - uidb64
                                                          - token
                        .                                            
                        """
        elif operation['operationId'] == 'users_password-reset_create':
            operation['summary'] = 'Reset password by email'
            operation['description'] = """
                                                      Allowed All users

                        . user getting password reset link (with uidb64 and token)                                           
                        """
        elif operation['operationId'] == 'users_read':
            operation['summary'] = 'Get user by id'
            operation['description'] = """
                                                      Allowed Authenticated users
                                                      needs params:
                                                          - id

                        . Admin can view all users profile and other users can view their own profile                                           
                        """
        elif operation['operationId'] == 'users_delete':
            operation['summary'] = 'Delete user by id'
            operation['description'] = """
                                                      Allowed Admin
                                                      needs params:
                                                          - id

                        . Admin can delete user                                           
                        """
        elif operation['operationId'] == 'users_password-change_create':
            operation['summary'] = 'Change password by id'
            operation['description'] = """
                                                      Allowed Authenticated users
                                                      needs params:
                                                          - id
                        .                                            
                        """
        elif operation['operationId'] == 'users_list_deleted':
            operation['summary'] = 'Get list of deleted users'
            operation['description'] = """
                                                      Allowed only admin
                        .                                            
                        """
        elif operation['operationId'] == 'users_me':
            operation['summary'] = 'Get authenticated user profile'
            operation['description'] = """
                                                      Allowed only authenticated users
                        .                                            
                        """
        else:
            operation['summary'] = 'Update user by id'
            operation['description'] = """
                                                      Allowed Admin or Owner profile
                                                      needs params:
                                                          - id

                        . Admin can update all users profile and other users can update their own profile                                           
                        """
        return operation


class ContactUsDocAPIView(SwaggerAutoSchema):
    def get_operation(self, operation_keys=None):
        operation = super().get_operation(operation_keys)
        if operation['operationId'] == 'contact-us_list':
            operation['summary'] = 'Get list of messages with contact us form messages'
            operation['description'] = """
                                                      Allowed admin, manager
                        .                                            
                        """
        elif operation['operationId'] == 'contact-us_create':
            operation['summary'] = 'Create a new contact us form message'
            operation['description'] = """
                                                      Allowed Authenticated user
                        .                                            
                        """
        elif operation['operationId'] == 'contact-us_read':
            operation['summary'] = 'Get contact us by id'
            operation['description'] = """
                                                      Allowed admin, manager
                                                      needs params:
                                                      - id
                        .
                        """
        elif operation['operationId'] == 'contact-us_delete':
            operation['summary'] = 'Delete contact us by id'
            operation['description'] = """
                                                      Allowed admin, manager
                                                      needs params:
                                                      - id
                        .
                        """
        else:
            operation['summary'] = 'Update contact us by id'
            operation['description'] = """
                                                      Allowed admin, manager
                                                      needs params:
                                                      - id
                        .
                        """
        return operation


class ShopsDocAPIView(SwaggerAutoSchema):
    def get_operation(self, operation_keys=None):
        operation = super().get_operation(operation_keys)
        if operation['operationId'] == 'shops_list':
            operation['summary'] = 'Get list of shops'
            operation['description'] = """
                                                      Allowed only admin
                        .                                            
                        """
        elif operation['operationId'] == 'shops_create':
            operation['summary'] = 'Create a new shop'
            operation['description'] = """
                                                      Allowed only admin
                        .                                            
                        """
        elif operation['operationId'] == 'shops_read':
            operation['summary'] = 'Get shop by id'
            operation['description'] = """
                                                      Allowed only admin
                                                      needs params:
                                                      - id
                        .
                        """
        elif operation['operationId'] == 'shops_delete':
            operation['summary'] = 'Delete shop by id'
            operation['description'] = """
                                                      Allowed only admin
                                                      needs params:
                                                      - id
                        .
                        """
        else:
            operation['summary'] = 'Update shop by id'
            operation['description'] = """
                                                      Allowed only admin
                                                      needs params:
                                                      - id
                        .
                        """
        return operation


class CategoriesDocAPIView(SwaggerAutoSchema):
    def get_operation(self, operation_keys=None):
        operation = super().get_operation(operation_keys)
        if operation['operationId'] == 'categories_list':
            operation['summary'] = 'Get list of categories'
            operation['description'] = """
                                                      Allowed any users
                        .                                            
                        """
        elif operation['operationId'] == 'categories_create':
            operation['summary'] = 'Create a new category'
            operation['description'] = """
                                                      Allowed only admin
                        .                                            
                        """
        elif operation['operationId'] == 'categories_read':
            operation['summary'] = 'Get category by id'
            operation['description'] = """
                                                      Allowed any users
                                                      needs params:
                                                      - id
                        .
                        """
        elif operation['operationId'] == 'categories_delete':
            operation['summary'] = 'Delete category by id'
            operation['description'] = """
                                                      Allowed only admin
                                                      needs params:
                                                      - id
                        .
                        """
        elif operation['operationId'] == 'categories_node_children':
            operation['summary'] = 'Get list of category children'
            operation['description'] = """
                                                      Allowed any users
                                                      needs params:
                                                      - id
                        .
                        """
        elif operation['operationId'] == 'categories_root_nodes':
            operation['summary'] = 'Get list of categories which are root nodes'
            operation['description'] = """
                                                      Allowed any users
                        .                                            
                        """
        elif operation['operationId'] == 'categories_list_without_pagination':
            operation['summary'] = 'Get list of categories without pagination'
            operation['description'] = """
                                                      Allowed Any Users
                        .                                            
                        """
        else:
            operation['summary'] = 'Update category by id'
            operation['description'] = """
                                                      Allowed only admin
                                                      needs params:
                                                      - id
                        .
                        """
        return operation


class WishListDocAPIView(SwaggerAutoSchema):
    def get_operation(self, operation_keys=None):
        operation = super().get_operation(operation_keys)
        if operation['operationId'] == 'wish-list_list':
            operation['summary'] = 'Get list of wish lists'
            operation['description'] = """
                                                      Allowed Admin, Manager, Owner
                        .                                            
                        """
        elif operation['operationId'] == 'wish-list_create':
            operation['summary'] = 'Add shop product to wish list'
            operation['description'] = """
                                                      Allowed Admin, Manager, Owner
                        .                                            
                        """
        elif operation['operationId'] == 'wish-list_read':
            operation['summary'] = 'Get product from wish list by id'
            operation['description'] = """
                                                      Allowed Admin, Manager, Owner
                                                      needs params:
                                                      - id
                        .
                        """
        elif operation['operationId'] == 'wish-list_delete':
            operation['summary'] = 'Delete product from wish list by id'
            operation['description'] = """
                                                      Allowed Admin, Manager, Owner
                                                      needs params:
                                                      - id
                        .
                        """
        elif operation['operationId'] == 'wish-list_delete_by_product':
            operation['summary'] = 'Delete product from wish list by id product'
            operation['description'] = """
                                                      Allowed only Owner
                                                      needs params:
                                                      - id (product)
                        .
                        """
        else:
            operation['summary'] = 'Update wish list by id'
            operation['description'] = """
                                                      Allowed Admin, Manager, Owner
                                                      needs params:
                                                      - id
                        .
                        """
        return operation

class ProductDocAPIView(SwaggerAutoSchema):
    def get_operation(self, operation_keys=None):
        operation = super().get_operation(operation_keys)
        if operation['operationId'] == 'products_list':
            operation['summary'] = 'Get list of products'
            operation['description'] = """
                                                      Allowed any users
                           Ordering by:
                                  - name
                                  - category                                                       
                                  - price                                                       
                                  - height                                                       
                                  - diameter                           
                        .                                            
                        """
        elif operation['operationId'] == 'products_create':
            operation['summary'] = 'Create a new product'
            operation['description'] = """
                                                      Allowed only admin
                        .                                            
                        """
        elif operation['operationId'] == 'products_read':
            operation['summary'] = 'Get product by id'
            operation['description'] = """
                                                      Allowed any users
                                                      needs params:
                                                      - id
                        .
                        """
        elif operation['operationId'] == 'products_delete':
            operation['summary'] = 'Delete product by id'
            operation['description'] = """
                                                      Allowed only admin
                                                      needs params:
                                                      - id
                        .
                        """
        else:
            operation['summary'] = 'Update product by id'
            operation['description'] = """
                                                      Allowed only admin
                                                      needs params:
                                                      - id
                        .
                        """
        return operation


class DeliveryAddressDocAPIView(SwaggerAutoSchema):
    def get_operation(self, operation_keys=None):
        operation = super().get_operation(operation_keys)
        if operation['operationId'] == 'delivery-addresses_list':
            operation['summary'] = 'Get list of delivery address'
            operation['description'] = """
                                                      Allowed Admin, Manager, Owner
                        .                                            
                        """
        elif operation['operationId'] == 'delivery-addresses_create':
            operation['summary'] = 'Create a new delivery address'
            operation['description'] = """
                                                      Allowed Admin, Manager, Owner
                        .                                            
                        """
        elif operation['operationId'] == 'delivery-addresses_read':
            operation['summary'] = 'Get delivery address by id'
            operation['description'] = """
                                                      Allowed Admin, Manager, Owner
                                                      needs params:
                                                      - id
                        .
                        """
        elif operation['operationId'] == 'delivery-addresses_delete':
            operation['summary'] = 'Delete delivery address by id'
            operation['description'] = """
                                                      Allowed Admin, Manager, Owner
                                                      needs params:
                                                      - id
                        .
                        """
        else:
            operation['summary'] = 'Update delivery address by id'
            operation['description'] = """
                                                      Allowed Admin, Manager, Owner
                                                      needs params:
                                                      - id
                        .
                        """
        return operation


class OrderItemDocAPIView(SwaggerAutoSchema):
    def get_operation(self, operation_keys=None):
        operation = super().get_operation(operation_keys)
        if operation['operationId'] == 'orders-items_list':
            operation['summary'] = 'Get list of order items'
            operation['description'] = """
                                                      Allowed Admin, Manager
                        .                                            
                        """
        elif operation['operationId'] == 'orders-items_create':
            operation['summary'] = 'Create a new order item'
            operation['description'] = """
                                                      Allowed Admin, Manager
                        .                                            
                        """
        elif operation['operationId'] == 'orders-items_read':
            operation['summary'] = 'Get order item by id'
            operation['description'] = """
                                                      Allowed Admin, Manager
                                                      needs params: id
                        .
                        """
        elif operation['operationId'] == 'orders-items_delete':
            operation['summary'] = 'Delete order item by id'
            operation['description'] = """
                                                      Allowed Admin, Manager
                                                      needs params: id
                        .
                        """
        else:
            operation['summary'] = 'Update order item by id'
            operation['description'] = """
                                                      Allowed Admin, Manager
                                                      needs params: id
                        .
                        """
        return operation


class OrderDocAPIView(SwaggerAutoSchema):
    def get_operation(self, operation_keys=None):
        operation = super().get_operation(operation_keys)
        if operation['operationId'] == 'orders_list':
            operation['summary'] = 'Get list of orders'
            operation['description'] = """
                                                      Allowed Admin, Manager, Owner
                        .                                            
                        """
        elif operation['operationId'] == 'orders_create':
            operation['summary'] = 'Create a new order'
            operation['description'] = """
                                                     Allowed Admin, Manager, Owner
                        .                                            
                        """
        elif operation['operationId'] == 'orders_read':
            operation['summary'] = 'Get order by id'
            operation['description'] = """
                                                      Allowed Admin, Manager, Owner
                                                      needs params:
                                                      - id
                        .
                        """
        elif operation['operationId'] == 'orders_delete':
            operation['summary'] = 'Delete order by id'
            operation['description'] = """
                                                      Allowed Admin, Manager
                                                      needs params:
                                                      - id
                        .
                        """
        elif operation['operationId'] == 'orders_admin':
            operation['summary'] = 'Create orders as staff'
            operation['description'] = """
                                                      Allowed Admin, Manager
                                                      needs params:
                                                      - list of stock products
                        .                                            
                        """
        else:
            operation['summary'] = 'Update order by id'
            operation['description'] = """
                                                      Allowed Admin, Manager
                                                      needs params:
                                                      - id
                        .
                        """
        return operation


class CartDocAPIView(SwaggerAutoSchema):
    def get_operation(self, operation_keys=None):
        operation = super().get_operation(operation_keys)
        if operation['operationId'] == 'carts_list':
            operation['summary'] = 'Get list of carts'
            operation['description'] = """
                                                      Allowed owner profile
                        .                                            
                        """
        elif operation['operationId'] == 'carts_create':
            operation['summary'] = 'Create a new cart'
            operation['description'] = """
                                                      Allowed owner profile
                        .                                            
                        """
        elif operation['operationId'] == 'carts_read':
            operation['summary'] = 'Get cart by id'
            operation['description'] = """
                                                      Allowed owner profile
                                                      needs params:
                                                      - id
                        .
                        """
        elif operation['operationId'] == 'carts_delete':
            operation['summary'] = 'Delete cart by id'
            operation['description'] = """
                                                      Allowed owner profile
                                                      needs params:
                                                      - id
                        .
                        """
        elif operation['operationId'] == 'carts_delete_by_variant':
            operation['summary'] = 'Delete cart by variant id'
            operation['description'] = """
                                                      Allowed owner profile
                                                      needs params:
                                                      - id (variant id)
                        .
                        """
        else:
            operation['summary'] = 'Update cart by id'
            operation['description'] = """
                                                      Allowed owner profile
                                                      needs params:
                                                      - id
                        .
                        """
        return operation


class VariantDocAPIView(SwaggerAutoSchema):
    def get_operation(self, operation_keys=None):
        operation = super().get_operation(operation_keys)
        if operation['operationId'] == 'variants_list':
            operation['summary'] = 'Get list of variants'
            operation['description'] = """
                                                      Allowed Admin, Manager
                        .                                            
                        """
        elif operation['operationId'] == 'variants_create':
            operation['summary'] = 'Create a new variant'
            operation['description'] = """
                                                      Allowed Admin, Manager
                        .                                            
                        """
        elif operation['operationId'] == 'variants_read':
            operation['summary'] = 'Get variants by id'
            operation['description'] = """
                                                      Allowed Admin, Manager
                                                      needs params:
                                                      - id
                        .
                        """
        elif operation['operationId'] == 'variants_delete':
            operation['summary'] = 'Delete variants by id'
            operation['description'] = """
                                                      Allowed Admin, Manager
                                                      needs params:
                                                      - id
                        .
                        """
        else:
            operation['summary'] = 'Update variants by id'
            operation['description'] = """
                                                      Allowed Admin, Manager
                                                      needs params:
                                                      - id
                        .
                        """
        return operation
