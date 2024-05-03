from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Producto(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50, blank=False, unique=True)
    brand = models.CharField(max_length=50, null=False, default='')
    category = models.CharField(choices=(
        ('Muebles', 'Muebles'), ('Electrodomesticos', 'Electrodomesticos'),
        ('Celulares', 'Celulares')), max_length=50, blank=True, null=True)
    price = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(1000000000)], blank=False, null=False, default=1)
    stock = models.IntegerField(validators=[MinValueValidator(0)], blank=False, null=False, default=0)

    def __str__(self):
        return f"{str(self.id)} {self.name}"

    class Meta:
        db_table = "Producto"