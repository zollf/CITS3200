from faker.factory import Factory
from django.test import TestCase, Client
from django.urls import reverse
from ..models import Settings
from .tests_models import SettingsFactory
from app.authentication.models import User
from app.parking.tests.tests_models import CarparkFactory

faker = Factory.create()

class AdminTest(TestCase):
    def setUp(self):
        User.objects.create_superuser('test@gmail.com', 'testpassword', '0123456789', username="testadmin")
        self.client = Client()
        self.client.login(username="testadmin", password="testpassword")

    def test_settings_get(self):
        "Settings GET"
        response = self.client.get(reverse('settings'))
        self.assertEqual(response.status_code, 200)

    def test_settings_post(self):
        "Settings POST"
        fake_key = faker.word()
        fake_setting = SettingsFactory(key=fake_key)
        old_value = fake_setting.value
        self.assertEqual(Settings.objects.get(key=fake_key).value, old_value)

        new_value = faker.phone_number()
        settings = Settings.getDict()
        settings[fake_key] = new_value

        self.client.post(reverse('settings'), settings)

        self.assertNotEqual(Settings.objects.get(key=fake_key).value, old_value)
        self.assertEqual(Settings.objects.get(key=fake_key).value, new_value)

    def staff_required(self):
        "Staff Required GET"
        response = self.client.get(reverse('staff_required'))
        self.assertEqual(response.status_code, 200)

    def test_dashboard(self):
        "Dashboard GET"
        response = self.client.get(reverse('admin'))
        self.assertEqual(response.status_code, 200)

    def test_carparks(self):
        "Carparks GET"
        carparks = [CarparkFactory(), CarparkFactory(), CarparkFactory()]
        response = self.client.get(reverse('carparks'))
        self.assertEqual(response.status_code, 200)
        for i in range(len(response.context['carparks'])):
            self.assertEqual(response.context['carparks'][i]['id'], carparks[i].id)

    def test_carpark(self):
        "Carpark GET"
        carpark = CarparkFactory()
        response = self.client.get(reverse('carpark_view', kwargs={"pk": carpark.id}))
        self.assertEqual(response.status_code, 200)

    def test_carpark_not_found(self):
        "Carpark NOT FOUND"
        response = self.client.get(reverse('carpark_view', kwargs={"pk": 99999}))
        self.assertEqual(response.status_code, 404)
