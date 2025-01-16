from products.models import Products, Category, Photos
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "Seed the database with sample data"

    def handle(self, *args, **kwargs):
        # Seed categories
        categories = [
            {"name": "Clothing"},
            {"name": "Accessories"},
            {"name": "Men"},
            {"name": "Women"},
            {"name": "Sale"},
        ]
        products = [
            {
                "name": "T-Shirt",
                "description": "A comfortable cotton t-shirt.",
                "price": 19.99,
                "categories": ["Clothing", "Men"],
                "photos": [
                    "https://example.com/tshirt1.jpg",
                    "https://example.com/tshirt2.jpg",
                ],
            },
            {
                "name": "Jeans",
                "description": "Stylish blue jeans.",
                "price": 49.99,
                "categories": ["Clothing"],
                "photos": [
                    "https://example.com/jeans1.jpg",
                    "https://example.com/jeans2.jpg",
                ],
            },
        ]
        for category_data in categories:
            category, created = Category.objects.get_or_create(**category_data)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created category: {category.name}"))
            else:
                self.stdout.write(f"Category {category.name} already exists.")

        for product_data in products:
            categories = product_data.pop("categories")  # Remove categories from product_data
            photos = product_data.pop("photos")
            product, created = Products.objects.get_or_create(**product_data)  # Use Products here
            for category_name in categories:
                category = Category.objects.get(name=category_name)
                product.categories.add(category)
            for image in photos:
                Photos.objects.get_or_create(product=product, image_url=image)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created product: {product.name}"))
            else:
                self.stdout.write(f"Product {product.name} already exists.")
