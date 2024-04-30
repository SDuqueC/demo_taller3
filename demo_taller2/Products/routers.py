from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'product', ProductoViewSet, basename='Producto_viewset')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]