# Generated by Django 3.2.7 on 2021-10-09 05:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Emails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('category', models.CharField(max_length=255)),
                ('payload', models.TextField()),
                ('date', models.DateField()),
            ],
            options={
                'db_table': 'admin_email_log',
            },
        ),
    ]