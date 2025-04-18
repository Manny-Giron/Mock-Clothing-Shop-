from django.urls import path
from .views import ProductsListView, ProductDetailView, ProductCreateView, ProductUpdateView, ProductRemoveView, AddCategory, RemoveCategory, CategoriesDetailView

urlpatterns = [
    path('products/', ProductsListView.as_view(), name="products-list"),
    path('products/<int:pk>/', ProductDetailView.as_view(), name="product"),
    path('products/create/', ProductCreateView.as_view(), name='product-create'),
    path('products/<int:pk>/update/', ProductUpdateView.as_view(), name='product-update'),
    path('products/<int:pk>/delete/', ProductRemoveView.as_view(), name='product-delete'),
    path('categories/', CategoriesDetailView.as_view(), name='categories'),
    path('categories/create/', AddCategory.as_view(), name='category-create'),
    path('categories/<int:pk>/delete/', RemoveCategory.as_view(), name='category-update'),
]