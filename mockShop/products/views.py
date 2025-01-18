from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Products
from .serializers import ProductsSerializer

# View for all products
class ProductsListView(APIView):
    def get(self, request):
        products = Products.objects.all()  # Query all products
        serializer = ProductsSerializer(products, many=True)  # Serialize the data
        return Response(serializer.data, status=status.HTTP_200_OK)

# View for a single product
class ProductDetailView(APIView):
    def get(self, request, pk):
        try:
            product = Products.objects.get(pk=pk)  # Query product by primary key
            serializer = ProductsSerializer(product)  # Serialize the product
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Products.DoesNotExist:
            return Response(
                {"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )
