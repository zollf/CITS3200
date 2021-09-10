import React from 'react';
import styles from './styles.module.css';
import MapIcon from '@/app/resources/static/images/map-pin.svg';
import NewWindowIcon from '@/app/resources/static/images/open-in-new.svg';

interface Props {
  name: string;
  description: string;
  mapURL: string;
}

const CarparkCard = ({ name, description, mapURL }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.topHalf}>
        <h3>{name}</h3>
      </div>
      <div className={styles.bottomHalf}>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
        <div className={styles.directions}>
          <MapIcon />
          <a href={mapURL} className={'p-small-bold'} target="_blank" rel="noopener noreferrer">
            &nbsp; Get directions
            <NewWindowIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarparkCard;
