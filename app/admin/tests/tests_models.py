from faker.factory import Factory
from factory.django import DjangoModelFactory
from django.test import TestCase
from ..models import Settings
from assertpy import assert_that

faker = Factory.create()

class SettingsFactory(DjangoModelFactory):
    key = faker.word()
    label = faker.word()
    value = faker.phone_number()
    type = 'text'

    class Meta:
        model = Settings

class SettingsModelTest(TestCase):
    def setUp(self):
        """Create a new fake key"""
        self.fake_key = faker.word()
        self.fake_setting = SettingsFactory(key=self.fake_key)

    def test_getKeys(self):
        """Should return new fake key"""
        assert_that(Settings.getKeys()).contains(self.fake_key)

    def test_getDict(self):
        """Should return settings dictionary"""
        settings = Settings.getDict()
        self.assertEqual(settings[self.fake_key], self.fake_setting.value)

    def test_settings(self):
        "Settings Model"
        setting = SettingsFactory()
        self.assertEqual(setting.key, Settings.objects.get(pk=setting.id).key)
        setting.delete()
        with self.assertRaises(Settings.DoesNotExist):
            Settings.objects.get(pk=setting.id)
