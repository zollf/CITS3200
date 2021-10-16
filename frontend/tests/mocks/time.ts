import faker from 'faker';

import Times from '../../lib/Times';
import { selection } from '../../lib/BayInitialProps';

faker.seed(1);

const TimeMock = (bayNum: number, time: string): Time => ({
  time: time,
  slug: `bay:${bayNum}-time:${time}`,
  status: selection.AVAILABLE,
  bayNum: bayNum,
  bayId: faker.datatype.number(),
  index: Times.indexOf(time),
  endTime: Times[(Times.indexOf(time) + 1) % Times.length],
});

const TimeMocks = [
  TimeMock(1, '08:00'),
  TimeMock(1, '08:30'),
  TimeMock(1, '09:00'),
  TimeMock(2, '22:30'),
  TimeMock(2, '23:00'),
  TimeMock(2, '23:30'),
  TimeMock(3, '00:00'),
];

export { TimeMock, TimeMocks };
