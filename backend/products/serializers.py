from mptt.exceptions import InvalidMove
from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField

from common.constants import Size
from products.models import Shop, Category, WishList, Image, Variant, Product


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'image', 'product')


class FileUploadSerializer(serializers.ModelSerializer):
    images = serializers.ListField(child=serializers.ImageField(max_length=1000, allow_empty_file=False, use_url=False))

    class Meta:
        model = Image
        exclude = ('product',)

    def create(self, validated_data):
        product = self.context['product']
        file = validated_data.pop('images')
        image_list = []
        for img in file:
            photo = Image.objects.create(image=img, product=product)
            image_info = f'{photo.image.url}'
            image_list.append(image_info)
        return {'images': image_list}

    def to_representation(self, instance):
        return instance


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'parent')

    def update(self, instance, validated_data):
        try:
            return super().update(instance, validated_data)
        except InvalidMove as exp:
            raise serializers.ValidationError({"detail": exp})


class CategoryRetrieveSerializer(serializers.ModelSerializer):
    parent = CategorySerializer()

    class Meta:
        model = Category
        fields = ('id', 'name', 'parent')


class CategoryTreeSerializer(serializers.ModelSerializer):
    children = RecursiveField(many=True, read_only=True, source='get_children')

    class Meta:
        model = Category
        fields = ['id', 'name', 'parent', 'children']


class WishListCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishList
        fields = ('id', 'product', 'creator')

    def create(self, validated_data):
        if wish_product := WishList.objects.filter(shop_product=validated_data['shop_product'].id, creator=validated_data['creator']):
            return wish_product.first()
        return super().create(validated_data)


class VariantSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        required=False, allow_empty=True,
        child=serializers.ImageField(max_length=1000, allow_empty_file=False, use_url=False)
    )

    class Meta:
        model = Variant
        fields = ('id', 'size', 'height', 'diameter', 'hex_color', 'quantity', 'price', 'product', 'image', 'images')

    def create(self, validated_data):
        images = validated_data.pop('images', None)
        variant = super().create(validated_data)
        if images:
            Image.objects.bulk_create([Image(product=variant, image=image) for image in images])
        return variant

    def to_representation(self, instance):
        return instance


class ProductCreateSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    shop = serializers.PrimaryKeyRelatedField(queryset=Shop.objects.all())
    variants = VariantSerializer(many=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'sku', 'description', 'category', 'shop', 'variants')

    def create(self, validated_data):
        variants = validated_data.pop('variants', None)
        product = Product.objects.create(**validated_data)
        if variants:
            Variant.objects.bulk_create([Variant(product=product, **variant) for variant in variants])
        return product
