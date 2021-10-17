from faker.factory import Factory
from factory import SubFactory
from factory.django import DjangoModelFactory
from ..models import CarPark, CarBay

faker = Factory.create()

class CarparkFactory(DjangoModelFactory):
    name = faker.word()
    description = faker.words()
    google_maps_link = faker.url()

    class Meta:
        model = CarPark

class CarBayFactory(DjangoModelFactory):
    carpark = SubFactory(CarparkFactory)
    bay_number = faker.random_int()
    description = faker.words()

    class Meta:
        model = CarBay
