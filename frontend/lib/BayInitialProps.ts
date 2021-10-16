import Times, { standardTime } from './Times';

const AVAILABLE = 0;
const SELECTED = 1;
const UNAVAILABLE = 2;

const selection = { AVAILABLE, SELECTED, UNAVAILABLE };

/**
 * Gets all times slots based on a start time and end time with 30mins interval
 * @param globalStartTime global start time of booking system
 * @param globalEndTime global end time of booking system
 * @throws Error if global start time and end time are equal and not 00:00, as that represents a day
 * @returns All time slots available for the day
 */
const getTimes = (globalStartTime: string, globalEndTime: string): string[] => {
  if (globalStartTime === '00:00' && globalEndTime === '00:00') return Times;
  if (globalStartTime === globalEndTime) throw new Error('Global start time and global end time cannot be equal');

  const times: string[] = [];
  let foundStart = false;
  for (let i = 0; i < Times.length; i++) {
    if (Times[i] === globalStartTime) foundStart = true;
    if (foundStart) {
      if (Times[i] === globalEndTime) break;
      times.push(Times[i]);
    }
  }

  return times;
};

/**
 * Gets the initial state of all bays and their status (AVAILABLE or UNAVAILABLE)
 * @param bayResponse all bays from the api
 * @param bookedBaysResponse all booked bays and there times from the api
 * @param globalStartTime global start time of booking system
 * @param globalEndTime global end time of booking system
 * @returns times available, bays and information about their times
 */
const getInitialState = (
  bayResponse: BayResponse[],
  bookedBaysResponse: BaysBookedResponse,
  globalStartTime: string,
  globalEndTime: string,
): BaysInitialProps => {
  const times = getTimes(globalStartTime, globalEndTime);
  const ppBaysBooked = processBaysBooked(bookedBaysResponse.bays, times);
  const bays: Bay[] = bayResponse.map((b, row) => ({
    bayId: b.pk,
    bayNum: parseInt(b.bay_number),
    desc: b.description,
    times: [...new Array(times.length)].map((_, i) => ({
      slug: `bay:${row + 1}-time:${times[i]}`, // Our own key value, used to store in map
      status: ppBaysBooked[b.pk]?.[times[i]] ? UNAVAILABLE : AVAILABLE,
      bayId: b.pk, // Bay id is the id of bay set in db
      bayNum: parseInt(b.bay_number), // Bay number is set by unipark staff
      time: times[i],
      index: i,
      endTime: Times[(Times.indexOf(times[i]) + 1) % Times.length],
    })),
  }));

  return { times, bays };
};

interface PreprocessedTimes {
  [id: number]: {
    [time: string]: boolean;
  };
}

/**
 * Processes bays booked api response into an object
 * so we know which time slots have been taken up
 * @param bookedBaysResponse all booked bays and there times from the api
 * @param times times that are available to use
 * @returns process time slots that have been taken up
 */
const processBaysBooked = (bookedBaysResponse: BaysBookedResponse['bays'], times: string[]): PreprocessedTimes => {
  const baysBooked: PreprocessedTimes = {};
  bookedBaysResponse.forEach((b) => {
    let foundStart = false;
    const START_TIME = standardTime(b.start_time);
    const END_TIME = standardTime(b.end_time);
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
      if (times[i + 1] === END_TIME) break;
    }
  });

  return baysBooked;
};

export { getInitialState, selection, getTimes, processBaysBooked };
