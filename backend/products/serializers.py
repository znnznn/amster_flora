from drf_yasg.utils import swagger_serializer_method
from mptt.exceptions import InvalidMove
from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField

from key_crm.models import KeyCRMProduct
from key_crm.serializers import KeyCRMProductSerializer
from products.models import Shop, Category, WishList, Image, Variant, Product, Component


class ComponentSerializer(serializers.ModelSerializer):
    key_crm_product = serializers.PrimaryKeyRelatedField(queryset=KeyCRMProduct.objects.all())

    class Meta:
        model = Component
        fields = ('id', 'key_crm_product', 'quantity')


class ComponentListSerializer(serializers.ModelSerializer):
    key_crm_product = serializers.SerializerMethodField()

    class Meta:
        model = Component
        fields = ('id', 'key_crm_product', 'quantity')

    @swagger_serializer_method(KeyCRMProductSerializer)
    def get_key_crm_product(self, obj):
        if obj.key_crm_product:
            return KeyCRMProductSerializer(obj.key_crm_product).data
        return None



class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'image', 'variant')


class ImageUploadSerializer(serializers.Serializer):
    images = serializers.ListField(child=serializers.ImageField(max_length=1000, allow_empty_file=False, use_url=False))


class ImageDeleteSerializer(serializers.Serializer):
    images_ids = serializers.ListField(child=serializers.IntegerField())


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
        fields = ('id', 'product')

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['creator'] = user
        if wish_product := WishList.objects.filter(product=validated_data['product'].id, creator=user):
            return wish_product.first()
        return super().create(validated_data)


class ProductVariantCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        required=False, allow_empty=True,
        child=serializers.ImageField(max_length=1000, allow_empty_file=False, use_url=False)
    )
    components = serializers.ListField(child=ComponentSerializer(), required=False, allow_empty=True)

    class Meta:
        model = Variant
        fields = ('id', 'size', 'height', 'diameter', 'hex_color', 'quantity', 'price', 'image', 'images', 'components',)


class VariantSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        required=False, allow_empty=True,
        child=serializers.ImageField(max_length=1000, allow_empty_file=False, use_url=False)
    )
    components = serializers.ListField(child=ComponentSerializer(), required=False, allow_empty=True)
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Variant
        fields = ('id', 'product', 'size', 'height', 'diameter', 'hex_color', 'quantity', 'price', 'image', 'images', 'components',)

    def create(self, validated_data):
        images = validated_data.pop('images', None)
        components = validated_data.pop('components', None)
        variant = super().create(validated_data)
        if images:
            Image.objects.bulk_create([Image(variant=variant, image=image) for image in images])
        if components:
            Component.objects.bulk_create([Component(variant=variant, **component) for component in components])
        return variant

    def to_representation(self, instance):
        variant = Variant.objects.filter(id=instance.id).select_related(
            'product', "product__category").prefetch_related('images', 'components').first()
        instance = VariantRetrieveSerializer(variant).data
        return instance


class VariantRetrieveSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    components = serializers.SerializerMethodField()

    class Meta:
        model = Variant
        fields = ('id', 'size', 'height', 'diameter', 'hex_color', 'quantity', 'price', 'image', 'images', 'components',)

    @swagger_serializer_method(ComponentListSerializer(many=True))
    def get_components(self, obj):
        return ComponentListSerializer(obj.components.all(), many=True).data

    @swagger_serializer_method(ImageSerializer(many=True))
    def get_images(self, obj):
        return ImageSerializer(obj.images.all(), many=True).data


class VariantAdminSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    components = ComponentSerializer(many=True)

    class Meta:
        model = Variant
        fields = ('id', 'size', 'height', 'diameter', 'hex_color', 'quantity', 'price', 'image', 'images', 'components',)


class ProductShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'sku', 'description', 'category', 'shop')


class ProductCreateSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    shop = serializers.PrimaryKeyRelatedField(queryset=Shop.objects.all())
    variants = ProductVariantCreateSerializer(many=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'sku', 'description', 'category', 'shop', 'variants')

    def create(self, validated_data):
        variants = validated_data.pop('variants', None)
        product = Product.objects.create(**validated_data)
        if variants:
            for variant in variants:
                components = variant.pop('components', None)
                images = variant.pop('images', None)
                variant = Variant.objects.create(product=product, **variant)
                if components:
                    Component.objects.bulk_create([Component(variant=variant, **component) for component in components])
                if images:
                    Image.objects.bulk_create([Image(variant=variant, image=image) for image in images])
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
