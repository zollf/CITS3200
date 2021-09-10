import React from "react";
import styles from "./styles.module.css"
import available_times from "../../../../../lib/Times"

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

    const cleanedTimes: (Time | undefined )[] = [bayTimes.get(timeSlugs[0])];

    for (let i = 0; i < timeSlugs.length - 2; i++) {
        const previousBayNum = bayTimes.get(timeSlugs[i])?.bayNum;
        const previousTimePeriod = bayTimes.get(timeSlugs[i])?.index;
        //const timePeriod = bayTimes.get(timeSlugs[i+1])?.index;
        const nextBayNum = bayTimes.get(timeSlugs[i+2])?.bayNum;
        const nextTimePeriod = bayTimes.get(timeSlugs[i+2])?.index;

        if (previousTimePeriod && nextTimePeriod && previousBayNum == nextBayNum 
            && previousTimePeriod + 2 == nextTimePeriod) {
                continue;
        }
        else cleanedTimes.push(bayTimes.get(timeSlugs[i+1]));
    }

    cleanedTimes.push(bayTimes.get(timeSlugs[timeSlugs.length - 1]));

    console.log(cleanedTimes);
    const listItems = cleanedTimes.map((bookedTime) => {        
        return (
            <tr><td> {bookedTime?.bayNum} </td> <td> {bookedTime?.time} </td></tr>
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