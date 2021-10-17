from django.test import TestCase, Client
from django.urls import reverse
from app.authentication.models import User
from .tests_models import CarparkFactory, CarBayFactory
import copy
from app.parking.models import Bookings, BaysBooked


booking_mock = {
    "carpark": 1,
    "date": "2000-01-01",  # YYYY-MM-DD
    "name": "uniart",
    "email": "test@test.com",
    "rego": "1234",
    "company": "uni",
    "phone": 1234,
    "user": 1
}

bays_mock = [
    {
        "bay": 1,
        "start_time": "00:00",
        "end_time": "12:00"
    },
    {
        "bay": 2,
        "start_time": "00:00",
        "end_time": "12:00"
    }
]

booking_bays_mock = {
    "booking": booking_mock,
    "bays": bays_mock,
}

class BookingApiTest(TestCase):
    def setUp(self):
        User.objects.create_superuser('test@gmail.com', 'testpassword', '0123456789', username="testadmin")
        self.client = Client()
        self.client.login(username="testadmin", password="testpassword")

    def tearDown(self):
        pass

    def test_no_booking(self):
        "No bookings in request returns 400"
        response = self.client.post(reverse('booking'), content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'Please supply booking details.')

    def test_no_booked_bays(self):
        "No bays in request returns 400"
        response = self.client.post(reverse('booking'), {"booking": booking_mock}, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'Please supply bays to be booked.')

    def test_cannot_find_carpark(self):
        "No Carpark exists works correctly"
        response = self.client.post(reverse('booking'), booking_bays_mock, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'No carpark could be found given the id.')

    def test_connot_find_user(self):
        "No User exists works correctly"
        CarparkFactory()
        wrong_booking_bays_mock = copy.deepcopy(booking_bays_mock)
        wrong_booking_bays_mock["booking"]["user"] = 2
        response = self.client.post(reverse('booking'), wrong_booking_bays_mock, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'No user could be found given the id.')

    def test_booking_serialize_error(self):
        "Booking that can't be serialize returns error"
        CarparkFactory()
        wrong_booking_bays_mock = copy.deepcopy(booking_bays_mock)
        del wrong_booking_bays_mock["booking"]["name"]
        response = self.client.post(reverse('booking'), wrong_booking_bays_mock, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['errors'], {'name': ['This field is required.']})

        del wrong_booking_bays_mock["booking"]["email"]
        response = self.client.post(reverse('booking'), wrong_booking_bays_mock, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['errors'], {
                         'name': ['This field is required.'], 'email': ['This field is required.']})

    def test_cannot_find_carbay(self):
        "Cannot find carbay returns error"
        CarparkFactory()
        CarBayFactory()
        response = self.client.post(reverse('booking'), booking_bays_mock, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'No Carpark bay could be found given the id.')

    def test_booking_optional_properties(self):
        "Optional booking information works correctly"
        CarparkFactory()
        CarBayFactory()
        CarBayFactory()

        valid_booking_bays_mock = copy.deepcopy(booking_bays_mock)
        del valid_booking_bays_mock["booking"]["rego"]
        del valid_booking_bays_mock["booking"]["company"]

        response = self.client.post(reverse('booking'), valid_booking_bays_mock, content_type="application/json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['success'], True)
        self.assertEqual(response.json()['booking_id'], 1)

    def test_booking_is_saved_correctly(self):
        "Booking is saved correctly"
        CarparkFactory()
        CarBayFactory()
        CarBayFactory()
        response = self.client.post(reverse('booking'), booking_bays_mock, content_type="application/json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Bookings.objects.get(pk=response.json()['booking_id']).name, booking_mock["name"])

    def test_bays_booked_created(self):
        "Bays Booked are created correctly"
        CarparkFactory()
        CarBayFactory()
        CarBayFactory()
        response = self.client.post(reverse('booking'), booking_bays_mock, content_type="application/json")
        self.assertEqual(response.status_code, 201)

        baysBooked = BaysBooked.objects.all()
        self.assertEqual(len(baysBooked), len(bays_mock))
        for bayBooked in baysBooked:
            self.assertEqual(bayBooked.booking.id, response.json()['booking_id'])
