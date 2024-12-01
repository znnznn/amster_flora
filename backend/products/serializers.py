from drf_yasg.utils import swagger_serializer_method
from mptt.exceptions import InvalidMove
from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField

from common.constants import Size
from products.models import Shop, Category, WishList, Image, Variant, Product, Component


class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ('id', 'key_crm_product', 'quantity')

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'image', 'variant')


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


class VariantCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        required=False, allow_empty=True,
        child=serializers.ImageField(max_length=1000, allow_empty_file=False, use_url=False)
    )
    components = ComponentSerializer(many=True)

    class Meta:
        model = Variant
        fields = ('id', 'size', 'height', 'diameter', 'hex_color', 'quantity', 'price', 'image', 'images', 'components',)

    def create(self, validated_data):
        validated_data['product'] = self.context['product']
        images = validated_data.pop('images', None)
        components = validated_data.pop('components', None)
        variant = super().create(validated_data)
        if images:
            Image.objects.bulk_create([Image(variant=variant, image=image) for image in images])
        if components:
            Component.objects.bulk_create([Component(variant=variant, **component) for component in components])
        return variant


class VariantRetrieveSerializer(VariantCreateSerializer):
    images = ImageSerializer(many=True)


class VariantAdminSerializer(VariantCreateSerializer):
    images = ImageSerializer(many=True)
    components = ComponentSerializer(many=True)


class ProductShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'sku', 'description', 'category', 'shop')


class ProductCreateSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    shop = serializers.PrimaryKeyRelatedField(queryset=Shop.objects.all())
    variants = VariantCreateSerializer(many=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'sku', 'description', 'category', 'shop', 'variants')

    def create(self, validated_data):
        variants = validated_data.pop('variants', None)
        product = Product.objects.create(**validated_data)
        if variants:
            variants = VariantCreateSerializer(many=True, data=variants, context={'product': product})
            variants.is_valid(raise_exception=True)
            variants = variants.save()
            product.variants.set(variants)
        return product

    def to_representation(self, instance):
        instance = Product.objects.select_related("category", "shop").prefetch_related("variants", "variants__images").get(id=instance.id)
        return ProductListSerializer(instance).data


class VariantCartSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    images = ImageSerializer(many=True)

    class Meta:
        model = Variant
        fields = ('id', 'product', 'size', 'height', 'diameter', 'hex_color', 'quantity', 'price', 'image', 'images', 'components',)

    @swagger_serializer_method(ProductShortSerializer)
    def get_product(self, obj):
        if obj.product:
            return ProductShortSerializer(obj.product).data


class ProductListSerializer(serializers.ModelSerializer):
    variants = serializers.SerializerMethodField()
    in_wish_list = serializers.SerializerMethodField()
    in_cart = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('id', 'name', 'sku', 'description', 'category', 'shop', 'variants', 'in_wish_list', 'in_cart')

    @swagger_serializer_method(VariantRetrieveSerializer(many=True))
    def get_variants(self, obj):
        return VariantRetrieveSerializer(obj.variants.all(), many=True).data

    def get_in_wish_list(self, obj) -> bool:
        if getattr(obj, 'in_wish_list', None):
            return obj.in_wish_list
        return False

    def get_in_cart(self, obj) -> bool:
        if getattr(obj, 'in_cart', None):
            return obj.in_cart
        return False
