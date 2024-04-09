from django.contrib import admin
from .models import User, Rol, UserRol

# Register your models here.

admin.site.register(User)
admin.site.register(Rol)
admin.site.register(UserRol)