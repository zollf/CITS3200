import React from "react";
import styles from "./styles.module.css"

interface Props {
    bayTimes: Map<string, boolean>
}

const BayBookings = ({bayTimes}: Props) => {
    const listItems = [...bayTimes.keys()].map((bayTime, index) =>
        <tr>
             <td> {index + 1} </td> <td> {bayTime} </td> 
        </tr>
    );
    console.log(listItems);
    return (
        <table className={styles.bayTimes}>
            <tr> <th> Bay </th> <th> Time </th> </tr>
            {listItems}
        </table>
    )
}

export default BayBookings;