from rest_framework import serializers
from .models import Products, Category, Photos


class PhotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photos
        fields = ['id','image', 'product']
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name']

class ProductsSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(
    many=True,
    queryset=Category.objects.all(),
    required=False
)
    photos = serializers.PrimaryKeyRelatedField(
    many=True,
    queryset=Photos.objects.all(),
    required=False
)


    class Meta:
        model = Products
        fields = ['id', 'name', 'description', 'price', 'categories', 'photos']
