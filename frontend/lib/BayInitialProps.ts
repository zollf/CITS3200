import Times from './Times';

const GlobalStartTime = '08:00';
const GlobalEndTime = '20:00';
const Bays = 20;

const AVAILABLE = 0;
const SELECTED = 1;
const UNAVAILABLE = 2;

const selection = { AVAILABLE, SELECTED, UNAVAILABLE };

const getInitialState = (): BaysInitialProps => {
  const times: string[] = [];

  let foundStart = false;
  for (let i = 0; i < Times.length; i++) {
    if (Times[i] == GlobalStartTime) {
      foundStart = true;
    }
    if (foundStart) times.push(Times[i]);
    if (Times[i] == GlobalEndTime) break;
  }

  const bays: Bay[] = [...new Array(Bays)].map((_, i) => ({
    bayNum: i + 1,
    times: [...new Array(times.length)].map((_, j) => ({
      slug: `bay:${i + 1}-time:${times[j]}`,
      status: AVAILABLE,
      bayNum: i + 1,
      time: times[j],
      index: j,
    })),
  }));

  return { times, bays };
};

export { getInitialState, selection };
