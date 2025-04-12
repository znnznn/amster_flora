from django.db.models import Max
from drf_yasg.utils import swagger_serializer_method
from rest_framework import serializers

from common.mixins import CreatorSerializerMethodMixin
from orders.models import Cart, Order, OrderItem
from products.models import Variant
from products.serializers import VariantCartSerializer
from users.models import DeliveryAddress
from users.serializers import DeliveryAddressSerializer


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('id', 'variant', 'amount', 'created_at')

    def create(self, validated_data):
        last_position = Cart.objects.filter(
            creator=self.context['request'].user
        ).aggregate(last_position=Max('position', default=0))['last_position']
        if item := Cart.objects.filter(variant=validated_data['variant'], creator=self.context['request'].user).first():
            item.amount += validated_data['amount']
            item.save()
            return item
        validated_data['creator'] = self.context['request'].user
        validated_data['position'] = last_position + 1
        return Cart.objects.create(**validated_data)


class CartListSerializer(serializers.ModelSerializer):
    variant = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ('id', 'variant', 'amount', 'created_at', 'creator')

    @swagger_serializer_method(VariantCartSerializer)
    def get_variant(self, obj):
        return VariantCartSerializer(obj.variant).data


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('id', 'order', 'variant', 'amount', 'price', 'discount', 'percentage', 'creator')

    def update(self, instance, validated_data):
        if amount := validated_data.get('amount'):
            variant = instance.variant
            variant.quantity += instance.amount
            variant.quantity -= amount
            variant.save()
            change_amount = amount - instance.amount
            discount_by_one = instance.discount / instance.amount
            change_discount = change_amount * discount_by_one
            validated_data['discount'] = amount * discount_by_one
            order = instance.order
            order.discount += change_discount
            order.save()
        return super(OrderItemSerializer, self).update(instance, validated_data)


class OrderItemListSerializer(serializers.ModelSerializer):
    variant = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ('id', 'order', 'variant', 'amount', 'price', 'discount', 'percentage', 'creator')

    @swagger_serializer_method(VariantCartSerializer)
    def get_variant(self, obj):
        return VariantCartSerializer(obj.variant).data


class OrderCreateSerializer(serializers.Serializer):
    address = serializers.PrimaryKeyRelatedField(queryset=DeliveryAddress.objects.all(), required=False)

    def create(self, attrs):
        address = attrs.get('address')
        creator = self.context['request'].user
        if address and address.creator != creator:
            raise serializers.ValidationError({'address': ['Такого адресу не існує']})
        carts = Cart.objects.filter(creator=self.context['request'].user).select_related('variant').order_by('position')
        if not carts.exists():
            raise serializers.ValidationError({'carts': ['Корзина порожня']})
        order = Order.objects.create(creator=self.context['request'].user, address=address)
        order_items = []
        variants_updated = []
        for position, cart in enumerate(carts):
            ## TODO: add discount, percentage, validation by available amount
            order_items.append(
                OrderItem(
                    **{
                        'order': order, 'variant': cart.variant, 'amount': cart.amount, 'position': position, 'price': cart.variant.price,
                        'discount': 0, 'percentage': 0, 'creator': self.context['request'].user
                    }
                )
            )
            variant = cart.variant
            variant.quantity -= cart.amount
            variants_updated.append(variant)
        OrderItem.objects.bulk_create(order_items)
        Variant.objects.bulk_update(variants_updated, ['quantity'])
        carts.delete()
        attrs['order'] = order
        return attrs

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data


class OrderListSerializer(serializers.ModelSerializer, CreatorSerializerMethodMixin):
    address = serializers.SerializerMethodField()
    orders_items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ('id', 'status', 'address', 'creator', 'discount', 'created_at', 'orders_items')

    @swagger_serializer_method(DeliveryAddressSerializer)
    def get_address(self, obj):
        if obj.address:
            return DeliveryAddressSerializer(obj.address).data
        return None

    @swagger_serializer_method(OrderItemListSerializer(many=True))
    def get_orders_items(self, obj):
        return OrderItemListSerializer(obj.orders_items.all(), many=True).data
