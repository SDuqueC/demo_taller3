from django.db.models import Count, Case, When, IntegerField
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Producto
from .serializers import *


class ProductoViewSet(ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    @action(detail=False, methods=['get'])
    def por_marca(self, request):
        brand = request.query_params.get('brand', None)
        if brand is not None:
            products = Producto.objects.filter(brand=brand)
            serializer = self.get_serializer(products, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "Brand not provided"}, status=400)

    @action(detail=False, methods=['get'])
    def por_categoria(self, request):
        category = request.query_params.get('category', None)
        if category is not None:
            products = Producto.objects.filter(category=category)
            serializer = self.get_serializer(products, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "Category not provided"}, status=400)

    @action(detail=False, methods=['get'])
    def quantity_by_brand(self, request):
        # Group by brand and count the number of products for each brand
        product_counts = Producto.objects.values('brand').annotate(count=Count('id'))

        # Return the counts
        return Response(list(product_counts))

    @action(detail=False, methods=['get'])
    def quantity_by_category(self, request):
        # Group by category and count the number of products for each category
        product_counts = Producto.objects.values('category').annotate(count=Count('id'))

        # Return the counts
        return Response(list(product_counts))

    @action(detail=False, methods=['get'])
    def quantity_by_price(self, request):
        # Define the price ranges
        price_ranges = [
            (1, 399999),
            (400000, 999999),
            (1000000, 2999999),
            (3000000, None),
        ]

        # Annotate the queryset with a 'price_range' field
        queryset = Producto.objects.annotate(
            price_range=Case(
                *[When(price__gte=min_price, price__lt=(max_price if max_price is not None else 1000000000), then=i)
                  for i, (min_price, max_price) in enumerate(price_ranges)],
                output_field=IntegerField(),
            )
        )

        # Count the number of products in each price range
        product_counts = queryset.values('price_range').annotate(count=Count('id'))

        # Replace the price range indices with the actual price ranges
        product_counts = [
            {**item, 'price_range': price_ranges[item['price_range']]} for item in product_counts
        ]

        # Return the counts
        return Response(product_counts)

    @action(detail=False, methods=['get'])
    def quantity_by_stock(self, request):
        # Define the stock ranges
        stock_ranges = [
            (0, 4),
            (5, 9),
            (10, 14),
            (15, 19),
            (20, None),
        ]

        # Annotate the queryset with a 'stock_range' field
        queryset = Producto.objects.annotate(
            stock_range=Case(
                *[When(stock__gte=min_stock, stock__lt=(max_stock if max_stock is not None else 9999999999999), then=i)
                  for i, (min_stock, max_stock) in enumerate(stock_ranges)],
                default=len(stock_ranges)-1,
                output_field=IntegerField(),
            )
        )

        # Count the number of products in each stock range
        product_counts = queryset.values('stock_range').annotate(count=Count('id'))

        # Replace the stock range indices with the actual stock ranges
        product_counts = [
            {**item, 'stock_range': stock_ranges[item['stock_range']]} for item in product_counts
        ]

        # Return the counts
        return Response(product_counts)
# Create your views here.
