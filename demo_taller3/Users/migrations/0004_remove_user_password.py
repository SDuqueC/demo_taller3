# Generated by Django 4.2.6 on 2024-04-09 21:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0003_remove_user_last_login'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='password',
        ),
    ]
