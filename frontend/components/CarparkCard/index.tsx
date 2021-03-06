import React from 'react';
import cc from 'classcat';
import MapIcon from '@/app/resources/static/images/map-pin.svg';
import NewWindowIcon from '@/app/resources/static/images/open-in-new.svg';

import styles from './styles.module.css';

interface Props {
  name: string;
  description: string;
  mapURL: string;
  onClick?: () => void;
  hover?: boolean;
}

const CarparkCard = ({ name, description, mapURL, onClick, hover = true }: Props) => {
  return (
    <div className={cc({ [styles.card]: true, [styles.hover]: hover })} onClick={onClick} data-testid="carpark-card">
      <div className={styles.topHalf}>
        <h3>{name}</h3>
      </div>
      <div className={styles.bottomHalf}>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
        <div className={styles.directions}>
          <MapIcon />
          <a href={mapURL} className="p-small-bold" target="_blank" rel="noopener noreferrer">
            Get directions
            <NewWindowIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarparkCard;
