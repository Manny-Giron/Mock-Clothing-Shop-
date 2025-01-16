from django.db import models

class Photos(models.Model):
    product = models.ForeignKey(
        'Products', on_delete=models.CASCADE, related_name='photos'
    )  # Links each photo to a specific product
    image_url = models.URLField()

    def __str__(self):
        return self.image_url

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Products(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    categories = models.ManyToManyField(Category, related_name="products")

    def __str__(self):
        return self.name
