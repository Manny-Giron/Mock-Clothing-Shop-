from django.urls import path
from .views import ProductsListView, ProductDetailView, ProductCreateView, ProductUpdateView, ProductRemoveView

urlpatterns = [
    path('products/', ProductsListView.as_view(), name="products-list"),
    path('products/<int:pk>/', ProductDetailView.as_view(), name="product"),
    path('products/create/', ProductCreateView.as_view(), name='product-create'),
    path('products/<int:pk>/update/', ProductUpdateView.as_view(), name='product-update'),
    path('products/delete/', ProductRemoveView.as_view(), name='product-delete'),
]