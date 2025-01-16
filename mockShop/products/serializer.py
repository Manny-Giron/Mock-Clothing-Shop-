from rest_framework import serializers
from .models import Products, Category, Photos


class PhotosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photos
        fields = ['image_url']
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

class ProductsSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)  
    photos = PhotosSerializer(many=True, source='photos') 

    class Meta:
        model = Products
        fields = ['id', 'name', 'description', 'price', 'categories', 'photos']