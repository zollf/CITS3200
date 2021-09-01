from django.test import TestCase, Client
from django.urls import reverse
from app.authentication.models import User

class IndexViewTest(TestCase):
    def setUp(self):
        my_admin = User.objects.create_superuser('test@gmail.com', 
        'testpassword', '0123456789', username="testadmin")
        self.client = Client()
        self.client.login(username="testadmin", password="testpassword")

    def tearDown(self):
        pass

    def test_page(self):
        response = self.client.get(reverse('index'))
        self.assertEqual(response.status_code, 200)
