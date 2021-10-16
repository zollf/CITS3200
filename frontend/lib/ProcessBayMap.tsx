import React from 'react';

export default function createListItems(bayTimes: Map<string, Time>) {
  const timeSlugs = [...bayTimes.keys()];
  // Sort by bayNum, then by time (index of that time slot)
  timeSlugs.sort((time1, time2) => {
    const booking1 = bayTimes.get(time1)!;
    const booking2 = bayTimes.get(time2)!;
    const difference = booking1.bayNum - booking2.bayNum;

    return difference == 0 ? booking1.index - booking2.index : difference;
  });

  const cleanedTimes: Time[][] = [];
  let i = 0;

  while (i < timeSlugs.length) {
    // We push the first bayNum on then loop through the same bayNum that proceed after
    const consecutivePeriod: Time[] = [];
    consecutivePeriod.push(bayTimes.get(timeSlugs[i])!);
    let j = i; // j represents current bayNum we are looking at

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

    if (j != i) consecutivePeriod.push(bayTimes.get(timeSlugs[j])!);
    i = j + 1;
    cleanedTimes.push(consecutivePeriod);
  }

  return cleanedTimes;
}

export function renderCleanedTimes(bayTimes: Map<string, Time>) {
  const listItems = createListItems(bayTimes).map((bookedTime) => {
    return bookedTime.length == 1 ? (
      <tr key={bookedTime[0].slug}>
        <td>{bookedTime[0].bayNum}</td>
        <td>
          {bookedTime[0].time}-{bookedTime[0].endTime}
        </td>
      </tr>
    ) : (
      <tr key={bookedTime[0].slug}>
        <td>{bookedTime[0].bayNum} </td>
        <td>
          {bookedTime[0].time}-{bookedTime[1].endTime}
        </td>
      </tr>
    );
  });

  return listItems;
}
