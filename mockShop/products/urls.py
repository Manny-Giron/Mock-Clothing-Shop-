from django.urls import path
from .views import ProductsListView, ProductDetailView, ProductCreateView

urlpatterns = [
    path('products/', ProductsListView.as_view(), name="products-list"),
    path('products/<int:pk>', ProductDetailView.as_view(), name="product"),
    path('products/create/', ProductCreateView.as_view(), name='product-create'),

]