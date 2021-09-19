import Times from './Times';

const GlobalStartTime = '08:00';
const GlobalEndTime = '20:00';
const AVAILABLE = 0;
const SELECTED = 1;
const UNAVAILABLE = 2;

const selection = { AVAILABLE, SELECTED, UNAVAILABLE };

const getInitialState = (bayResponse: BayResponse[]): BaysInitialProps => {
  const times: string[] = [];

  let foundStart = false;
  let translation = 0;
  for (let i = 0; i < Times.length; i++) {
    if (Times[i] == GlobalStartTime) {
      translation = i;
      foundStart = true;
    }
    if (foundStart) times.push(Times[i]);
    if (Times[i] == GlobalEndTime) break;
  }

  const bays: Bay[] = bayResponse.map((b, i) => ({
    bayNum: parseInt(b.bay_number),
    times: [...new Array(times.length)].map((_, j) => ({
      slug: `bay:${i + 1}-time:${times[j]}`,
      status: AVAILABLE,
      bayNum: parseInt(b.bay_number),
      time: times[j],
      index: j + translation,
    })),
  }));

  return { times, bays };
};

export { getInitialState, selection };
