import React from "react";
import styles from "./styles.module.css"

interface Props {
    bayTimes: Map<string, Time>
}

const BayBookings = ({bayTimes}: Props) => {
    const timeSlugs = [...bayTimes.keys()];
    timeSlugs.sort((time1, time2) => {
            const bayNum1 = bayTimes.get(time1)?.bayNum; 
            const bayNum2 = bayTimes.get(time2)?.bayNum; 
            if (bayNum1 && bayNum2) return bayNum1 - bayNum2 
            else return 0;
        }
    )

    const cleanedTimes: (Time | undefined )[][] = [];
    let i = 0

    while (i < timeSlugs.length - 1) {
        let consecutivePeriod :( Time | undefined)[] = [];
        consecutivePeriod.push(bayTimes.get(timeSlugs[i]));
        let j = i;

        while (j < timeSlugs.length - 1) {
            const current = bayTimes.get(timeSlugs[j]);
            const next = bayTimes.get(timeSlugs[j+1]);
            const timePeriod = current!.index;
            const bayNum = current!.bayNum;
            const nextBayNum = next!.bayNum;
            const nextTimePeriod = next!.index;
            console.log(`time period: ${timePeriod}, bayNum: ${bayNum}, nextBayNum: ${nextBayNum}, 
            nextTimePeriod: ${nextTimePeriod}`);

            if (bayNum == nextBayNum && timePeriod + 1 == nextTimePeriod) j++;
            else break;
        }

        if (j != i) consecutivePeriod.push(bayTimes.get(timeSlugs[j]))
        i = j+1;
        cleanedTimes.push(consecutivePeriod);
    }

    //cleanedTimes.push(bayTimes.get(timeSlugs[timeSlugs.length - 1]));
    // conditional rendering - what if bookedTime only has 1 entry

    console.log(cleanedTimes);
    const listItems = cleanedTimes.map((bookedTime) => {        
        return (
            <tr><td> {bookedTime[0]?.bayNum} </td> <td> {bookedTime[0]?.time} - {bookedTime[1]?.time} </td></tr>
        )
    });

    return (
        <table className={styles.bayTimes}>
            <thead>
                <tr> <th> Bay </th> <th> Time </th> </tr>
            </thead>
            <tbody>
                {listItems}
            </tbody>
        </table>
    )
}

export default BayBookings;