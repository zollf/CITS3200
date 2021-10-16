import { bayBooked, baysBooked } from '@/frontend/tests/mocks/baysBooked';
import { bays } from '@/frontend/tests/mocks/bays';
import { uniq } from 'lodash';

import Times, { standardTime } from '../Times';
import { getInitialState, getTimes, processBaysBooked, selection } from '../BayInitialProps';

describe('getTimes()', () => {
  it('start=00:00, end=00:00 returns all times', () => {
    const times = getTimes('00:00', '00:00');
    expect(times).toEqual(Times);
  });

  it('start=08:00, end=10:00', () => {
    const times = getTimes('08:00', '10:00');
    expect(times).toEqual(['08:00', '08:30', '09:00', '09:30']);
  });

  it('start=08:00, end=08:00 throws error', () => {
    expect(() => getTimes('08:00', '08:00')).toThrow('Global start time and global end time cannot be equal');
  });
});

describe('processBaysBooked()', () => {
  const processBooking = processBaysBooked(baysBooked, getTimes('00:00', '00:00'));
  it('All bay ids appear in processed bookings', () => {
    // When processing bookings, we create a object/map with index being id
    // All bay ids fetched from the api should appear in the processed booking result

    // we toString() as `obj[1] = true;` becomes `{'1': true};` which is done in processBaysBooked()
    const allBayIds = baysBooked.map((b) => b.bay.id.toString());
    expect(uniq(allBayIds)).toEqual(Object.keys(processBooking));
  });

  it('End times should not appear in processed bookings, instead corresponding slot', () => {
    // Corresponding slots should show. E.g., end_time = 10:00, that corresponding booking slot is 09:30
    const endTimes: { [id: number]: string[] } = {};
    baysBooked.forEach((b) => {
      endTimes[b.bay.id] = [...(endTimes?.[b.bay.id] || []), standardTime(b.end_time)]; // slice to get rid of :SS from HH:MM:SS
    });
    Object.keys(endTimes).forEach((id) => {
      expect(Object.keys(processBooking[id]).some((time) => endTimes[id].includes(time))).toBe(false);
    });
  });

  it('All start times should appear in process bookings in their corresponding bay', () => {
    const startTimes: { [id: number]: string[] } = {};
    baysBooked.forEach((b) => {
      startTimes[b.bay.id] = [...(startTimes?.[b.bay.id] || []), standardTime(b.start_time)];
    });
    Object.keys(startTimes).forEach((id) => {
      expect(Object.keys(processBooking[id]).some((time) => startTimes[id].includes(time))).toBe(true);
    });
  });

  it('bookings made on the edges works correctly', () => {
    const edgeBookings = [bayBooked(1, '00:00:00', '01:00:00'), bayBooked(1, '23:00:00', '00:00:00')];
    const processEdge = processBaysBooked(edgeBookings, getTimes('00:00', '00:00'));
    const timesThatShouldExist = ['00:00', '00:30', '23:00', '23:30'];
    expect(Object.keys(processEdge['1']).sort()).toEqual(timesThatShouldExist);
  });

  it('*somehow* if bays booked times overlap, a reasonable processing should occur', () => {
    const overlappedBooking = [bayBooked(1, '02:00:00', '03:00:00'), bayBooked(1, '01:00:00', '02:30:00')];
    const processOverlapped = processBaysBooked(overlappedBooking, getTimes('00:00', '00:00'));
    const timesThatShouldExist = ['01:00', '01:30', '02:00', '02:30'];
    expect(Object.keys(processOverlapped['1']).sort()).toEqual(timesThatShouldExist);
  });
});

describe('getInitialState()', () => {
  it('returns correct information given mock', () => {
    const state = getInitialState(bays, { success: true, bays: baysBooked }, '00:00', '00:00');
    expect(state.times).toEqual(Times);
    state.bays.forEach((b) => {
      expect(b.times.length).toBe(Times.length);
    });
    // Check slot 1
    expect(state.bays[0].times[0].slug).toBe('bay:1-time:00:00');
    expect(state.bays[0].times[0].status).toBe(selection.AVAILABLE);
    expect(state.bays[0].times[0].endTime).toBe('00:30');

    // Check last slot
    expect(state.bays[0].times[state.times.length - 1].slug).toBe('bay:1-time:23:30');
    expect(state.bays[0].times[0].status).toBe(selection.AVAILABLE);
    expect(state.bays[0].times[state.times.length - 1].endTime).toBe('00:00');
  });

  it('bookings made on the edges', () => {
    const state = getInitialState(
      bays,
      { success: true, bays: [bayBooked(1, '00:00:00', '01:00:00'), bayBooked(1, '23:00:00', '00:00:00')] },
      '00:00',
      '00:00',
    );

    expect(state.bays[0].times[0].slug).toBe('bay:1-time:00:00');
    expect(state.bays[0].times[0].status).toBe(selection.UNAVAILABLE);
    expect(state.bays[0].times[0].endTime).toBe('00:30');

    expect(state.bays[0].times[state.times.length - 1].slug).toBe('bay:1-time:23:30');
    expect(state.bays[0].times[0].status).toBe(selection.UNAVAILABLE);
    expect(state.bays[0].times[state.times.length - 1].endTime).toBe('00:00');
  });

  it('normal start and end time', () => {
    const state = getInitialState(bays, { success: true, bays: baysBooked }, '08:00', '20:00');

    expect(state.bays[0].times[0].slug).toBe('bay:1-time:08:00');
    expect(state.bays[0].times[0].endTime).toBe('08:30');
    expect(state.bays[0].times[state.times.length - 1].slug).toBe('bay:1-time:19:30');
    expect(state.bays[0].times[state.times.length - 1].endTime).toBe('20:00');
  });
});
