# Generated by Django 3.2.7 on 2021-09-25 16:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('booking_admin', '0001_initial'),
    ]

    def insertData(apps, schema_editor):
        Settings = apps.get_model('booking_admin', 'Settings')

        NUM_STEPS = 3
        for i in range(NUM_STEPS):
            Settings(key="help" + str(i), label="Help - Step " + str(i), value="", type="textarea").save()

    operations = [
        migrations.RunPython(insertData)
    ]