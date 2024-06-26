# Generated by Django 4.2.6 on 2024-04-24 03:36

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True)),
                ('category', models.CharField(choices=[('Muebles', 'Muebles'), ('Electrodomesticos', 'Electrodomesticos'), ('Celulares', 'Celulares'), ('Moda', 'Moda')], max_length=50)),
                ('price', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(1000000000)])),
                ('stock', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
            ],
            options={
                'db_table': 'Producto',
            },
        ),
    ]
