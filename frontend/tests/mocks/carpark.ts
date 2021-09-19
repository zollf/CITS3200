import faker from 'faker';

faker.seed(1);

const carpark = (): Carpark => ({
  pk: faker.datatype.uuid(),
  name: faker.lorem.word(),
  description: faker.lorem.words(),
  google_maps_link: faker.internet.url(),
});

const carparks: Carpark[] = [carpark(), carpark(), carpark(), carpark(), carpark()];

export { carparks, carpark };
