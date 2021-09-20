import React from 'react';
import timePeriods from '@/frontend/lib/Times';

export default function createListItems(bayTimes: Map<string, Time>) {
  const timeSlugs = [...bayTimes.keys()];
  timeSlugs.sort((time1, time2) => {
    const booking1 = bayTimes.get(time1);
    const booking2 = bayTimes.get(time2);
    const difference = booking1!.bayNum - booking2!.bayNum;

    if (difference == 0) {
      return booking1!.index - booking2!.index;
    } else return difference;
  });

  const cleanedTimes: (Time | undefined)[][] = [];
  let i = 0;

  while (i < timeSlugs.length) {
    const consecutivePeriod: (Time | undefined)[] = [];
    consecutivePeriod.push(bayTimes.get(timeSlugs[i]));
    let j = i;

    while (j < timeSlugs.length - 1) {
      const current = bayTimes.get(timeSlugs[j]);
      const next = bayTimes.get(timeSlugs[j + 1]);
      const timePeriod = current!.index;
      const bayNum = current!.bayNum;
      const nextBayNum = next!.bayNum;
      const nextTimePeriod = next!.index;

      if (bayNum == nextBayNum && timePeriod + 1 == nextTimePeriod) j++;
      else break;
    }

    if (j != i) consecutivePeriod.push(bayTimes.get(timeSlugs[j]));
    i = j + 1;
    cleanedTimes.push(consecutivePeriod);
  }

  return cleanedTimes;
}

export function renderCleanedTimes(bayTimes: Map<string, Time>) {
  const listItems = createListItems(bayTimes).map((bookedTime) => {
    return bookedTime.length == 1 ? (
      <tr key={bookedTime[0]?.slug}>
        <td>{bookedTime[0]!.bayNum}</td>
        <td>
          {bookedTime[0]!.time}-{timePeriods[bookedTime[0]!.index + 1]}
        </td>
      </tr>
    ) : (
      <tr key={bookedTime[0]?.slug}>
        <td>{bookedTime[0]!.bayNum} </td>
        <td>
          {bookedTime[0]!.time}-{timePeriods[bookedTime[1]!.index + 1]}
        </td>
      </tr>
    );
  });

  return listItems;
}
