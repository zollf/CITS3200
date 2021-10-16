import faker from 'faker';

faker.seed(1);

const bayBooked = (id: number, start_time: string, end_time: string): BaysBookedResponse['bays'][0] => ({
  bay: {
    id,
    bay_number: faker.datatype.number().toString(),
    description: faker.lorem.words(),
    carpark: faker.datatype.number(),
  },
  start_time,
  end_time,
  pk: faker.datatype.number(),
});

const baysBooked = [
  bayBooked(1, '13:00:00', '15:30:00'),
  bayBooked(1, '16:30:00', '18:30:00'),
  bayBooked(2, '14:30:00', '18:30:00'),
  bayBooked(3, '12:30:00', '13:00:00'),
];

export { baysBooked, bayBooked };
