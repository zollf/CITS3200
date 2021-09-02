import React from "react"
import styles from './styles.module.css';
import MapIcon from '@/app/resources/static/images/map-pin.svg'
import NewWindowIcon from '@/app/resources/static/images/open-in-new.svg'

const CarparkCard = (props: any) => {
    return (
        <div className={styles.card}>
            <div className={styles.topHalf}>
                {props.carpark.name}
            </div>
            <div className={styles.bottomHalf}>
                <div className={styles.description}>
                    <p>{props.carpark.description}</p>
                </div>
                <div className={styles.directions}> 
                    <MapIcon />
                    <a href={props.carpark.mapURL} target="_blank">
                        &nbsp; Get directions
                        <NewWindowIcon />
                    </a>
                </div>
            </div>
        </div>
    );
};
  
export default CarparkCard;