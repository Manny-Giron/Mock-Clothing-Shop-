from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Products
from .serializers import ProductsSerializer
from .models import Products, Category, Photos
from decimal import Decimal


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
# Create a new product

class ProductCreateView(APIView):
    def post(self, request):
        data = request.data
        # Convert price to a float if it exists
        if "price" in data:
            try:
                data["price"] = float(data["price"])
            except (ValueError, TypeError):
                return Response(
                    {"error": "Price must be a valid decimal number"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        # Handle categories
        category_names = data.pop("categories", [])
        categories = Category.objects.filter(name__in=category_names)

        # Handle photos
        photo_urls = data.pop("photos", [])
        print("Data: \n", data)
        print("\n")
        serializer = ProductsSerializer(data=data)
        print(serializer)
        if serializer.is_valid():
            product = serializer.save()

            # Associate categories
            product.categories.set(categories)

            # Associate photos
            for photo_url in photo_urls:
                Photos.objects.create(product=product, image_url=photo_url)

            return Response(ProductsSerializer(product).data, status=status.HTTP_201_CREATED)

        # Handle invalid serializer case
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductUpdateView(APIView):
    def put(self, request, pk):
        try: 
            product = Products.objects.get(pk=pk)
        except:
            return Response({"error" : "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductsSerializer(product, data=data, partial=True)
        data = request.data
        if serializer.is_valid():
            product = product.serializer.save()
            
            categories_names = data.get("categories", [])
            photos_urls = data.get("photos", [])
            
            # Add categories
            if categories_names:
                new_categories = Category.objects.filter(name__in=categories_names)
                product.categories.set(new_categories)
                print(f"Updated Categories: {new_categories}")
            
            # Remove current photo linked then add new photos
            product.photos.all().delete()
            for url in photos_urls:
                Photos.objects.create(product=product, image_url=url)
                print(f"Added new image url: {url}")
            
            return Response(ProductsSerializer(product).data, status=status.HTTP_200_OK)    
        else:
            return Response({"error" : "Serializer not valid"}, status=status.HTTP_404_NOT_FOUND)
        
class ProductRemoveView(APIView):
    def put(self, request, pk):
        try:
            product = Products.objects.get(pk=pk)
            product.delete()
            return Response({"Successfully deleted product"}, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)