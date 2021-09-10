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

    const listItems = timeSlugs.map((slug) =>
        <tr>
             <td> {bayTimes.get(slug)?.bayNum} </td> <td> {bayTimes.get(slug)?.time} </td> 
        </tr>
    );
    return (
        <table className={styles.bayTimes}>
            <tr> <th> Bay </th> <th> Time </th> </tr>
            {listItems}
        </table>
    )
}

export default BayBookings;