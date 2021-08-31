import React from "react"
import styles from './styles.module.css';
import Map from '@/app/resources/static/images/map-pin.svg'
import NewWindow from '@/app/resources/static/images/open-in-new.svg'

const CarparkCard = (props: any) => {
    return (
        <div className={styles.card}>
            <div className={styles.topHalf}>
                {props.carpark.name}
            </div>
            <div className={styles.bottomHalf}>
                <div className={styles.description}>
                    {props.carpark.description}
                </div>
                <div className={styles.directions}> 
                    <Map />

                    <a href={props.carpark.mapURL} target="_blank">
                        &nbsp; Get directions
                        <NewWindow />
                    </a>
                </div>
            </div>
        </div>
    );
};
  
export default CarparkCard;