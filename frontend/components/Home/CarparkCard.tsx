import React from "react"
import styles from './styles.module.css';
import Map from '@/app/resources/static/images/map-pin.svg'
import NewWindow from '@/app/resources/static/images/open-in-new.svg'

const CarparkCard = () => {
    return (
        <div className={styles.card}>
            <div className={styles.topHalf}>
                Admin Carpark North
            </div>
            <div className={styles.bottomHalf}>
                <div className={styles.description}>
                    Car park located somewhere.
                </div>
                <div className={styles.directions}> 
                    <Map />

                    <a href="https://goo.gl/maps/RytgNDB4MW8McDBY6" target="_blank">
                        &nbsp; Get directions
                        <NewWindow />
                    </a>
                </div>
            </div>
        </div>
    );
};
  
export default CarparkCard;