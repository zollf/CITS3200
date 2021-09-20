import faker from 'faker';

faker.seed(1);

const bay = (id: number): BayResponse => ({
  bay_number: faker.datatype.number().toString(),
  carpark: faker.datatype.number(),
  description: faker.lorem.words(),
  pk: id,
});

const bays = [bay(1), bay(2), bay(3)];

export { bay, bays };
