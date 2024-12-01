from django.db.models import Max
from drf_yasg.utils import swagger_serializer_method
from rest_framework import serializers

from orders.models import Cart
from products.serializers import VariantCartSerializer


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
        fields = ('id', 'variant', 'amount', 'created_at')

    @swagger_serializer_method(VariantCartSerializer)
    def get_variant(self, obj):
        return VariantCartSerializer(obj.variant).data
