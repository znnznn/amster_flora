from mptt.exceptions import InvalidMove
from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField

from products.models import Shop, Category, WishList


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ('id', 'name', 'city', 'address', 'phone_number', 'email')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'origin_id', 'parent')

    def update(self, instance, validated_data):
        try:
            return super().update(instance, validated_data)
        except InvalidMove as exp:
            raise serializers.ValidationError({"detail": exp})


class CategoryRetrieveSerializer(serializers.ModelSerializer):
    parent = CategorySerializer()

    class Meta:
        model = Category
        fields = ('id', 'name', 'origin_id', 'parent')


class CategoryTreeSerializer(serializers.ModelSerializer):
    children = RecursiveField(many=True, read_only=True, source='get_children')

    class Meta:
        model = Category
        fields = ['id', 'name', 'parent', 'children']


class WishListCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishList
        fields = ('id', 'shop_product', 'creator')

    def create(self, validated_data):
        if wish_product := WishList.objects.filter(shop_product=validated_data['shop_product'].id, creator=validated_data['creator']):
            return wish_product.first()
        return super().create(validated_data)
