from faker.factory import Factory
from factory.django import DjangoModelFactory
from django.test import TestCase
from ..models import Settings
from assertpy import assert_that

faker = Factory.create()

class SettingsFactory(DjangoModelFactory):
    key = faker.word()
    value = faker.phone_number()

    class Meta:
        model = Settings

class SettingsModelTestCase(TestCase):
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
