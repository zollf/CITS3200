from faker.factory import Factory
from django.test import TestCase, Client
from django.urls import reverse
from ..models import Settings
from .tests_models import SettingsFactory
from app.authentication.models import User

faker = Factory.create()

class SettingViewTest(TestCase):
    def setUp(self):
        my_admin = User.objects.create_superuser('test@gmail.com',
                                                 'testpassword', '0123456789', username="testadmin")
        self.client = Client()
        self.client.login(username="testadmin", password="testpassword")

    def test_page(self):
        response = self.client.get(reverse('settings'))
        self.assertEqual(response.status_code, 200)

    def test_settings_post(self):
        """Post request should change value in db"""
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
