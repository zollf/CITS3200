# Generated by Django 3.2.7 on 2021-09-27 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='hub',
            field=models.TextField(null=True),
        ),
    ]
