from django.contrib import admin
from .models import Products, Category, Photos  # Import your models

# Shows how 'Products' are displayed in the admin
class ProductsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price') 
    list_filter = ('categories',)          
    search_fields = ('name',)              
    ordering = ('id',)                     
# Shows how 'Categorys' are displayed in the admin
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')          
    search_fields = ('name',)              
    
# Shows how 'Photos' are displayed in the admin
class PhotosAdmin(admin.ModelAdmin):
    list_display = ('id', 'product')  
    list_filter = ('product',)                     
    search_fields = ('product__name',)            

# Register the models with their respective customizations
admin.site.register(Products, ProductsAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Photos, PhotosAdmin)
