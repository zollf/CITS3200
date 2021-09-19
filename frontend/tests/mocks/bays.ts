import faker from 'faker';

faker.seed(1);

const bay = (): BayResponse => ({
  bay_number: faker.datatype.number().toString(),
  carpark: faker.datatype.number(),
  description: faker.lorem.words(),
  pk: faker.datatype.number(),
});

const bays = [bay(), bay(), bay()];

export { bay, bays };
