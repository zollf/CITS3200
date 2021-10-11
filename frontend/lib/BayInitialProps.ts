import Times from './Times';

const AVAILABLE = 0;
const SELECTED = 1;
const UNAVAILABLE = 2;

const selection = { AVAILABLE, SELECTED, UNAVAILABLE };

const getInitialState = (
  bayResponse: BayResponse[],
  bookedBaysResponse: BaysBookedResponse,
  globalStartTime: string,
  globalEndTime: string,
): BaysInitialProps => {
  const times: string[] = [];
  let foundStart = false;
  let translation = 0;
  for (let i = 0; i < Times.length; i++) {
    if (Times[i] == globalStartTime) {
      translation = i;
      foundStart = true;
    }
    if (foundStart) {
      times.push(Times[i]);
      // need foundStart to be true if for example 12:00 A.M. is the end time
      if (Times[i] == globalEndTime) break;
    }
  }

  const ppBaysBooked = ProcessBaysBooked(bookedBaysResponse.bays, times);
  const bays: Bay[] = bayResponse.map((b, i) => ({
    bayId: b.pk,
    bayNum: parseInt(b.bay_number),
    desc: b.description,
    times: [...new Array(times.length)].map((_, j) => ({
      slug: `bay:${i + 1}-time:${times[j]}`,
      status: ppBaysBooked[b.pk]?.[times[j]] ? UNAVAILABLE : AVAILABLE,
      bayId: b.pk,
      bayNum: parseInt(b.bay_number),
      time: times[j],
      index: j + translation,
    })),
  }));

  return { times, bays };
};

interface PreprocessedTimes {
  [bay: string]: {
    [time: string]: boolean;
  };
}

const ProcessBaysBooked = (bookedBaysResponse: BaysBookedResponse['bays'], times: string[]): PreprocessedTimes => {
  const baysBooked: PreprocessedTimes = {};
  bookedBaysResponse.forEach((b) => {
    let foundStart = false;
    const START_TIME = b.start_time.slice(0, -3);
    const END_TIME = b.end_time.slice(0, -3);
    for (let i = 0; i < times.length; i++) {
      if (times[i] === START_TIME) foundStart = true;
      if (foundStart) {
        if (!baysBooked[b.bay.id]) {
          baysBooked[b.bay.id] = {};
          baysBooked[b.bay.id][times[i]] = true;
        } else {
          baysBooked[b.bay.id][times[i]] = true;
        }
      }
      if (times[i] === END_TIME) break;
    }
  });

  return baysBooked;
};

export { getInitialState, selection };
