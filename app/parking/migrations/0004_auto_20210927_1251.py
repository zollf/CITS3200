# Generated by Django 3.2.7 on 2021-09-27 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parking', '0003_auto_20210920_1152'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookings',
            name='company',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='bookings',
            name='rego',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]
