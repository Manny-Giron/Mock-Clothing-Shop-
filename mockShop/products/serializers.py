from rest_framework import serializers
from .models import Products, Category, Photos


class PhotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photos
        fields = ['image_url']
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name']

class ProductsSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, required=False)
    photos = PhotosSerializer(many=True, required=False)

    class Meta:
        model = Products
        fields = ['id', 'name', 'description', 'price', 'categories', 'photos']
