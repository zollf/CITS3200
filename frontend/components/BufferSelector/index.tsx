import React from 'react';
import InfoIcon from '@/app/resources/static/images/info.svg';

import styles from './styles.module.css';

interface Props {
  active: number;
  onClick: (time: number) => void;
  infoClick: () => void;
}
const BufferSelector = ({ onClick, active, infoClick }: Props) => {
  return (
    <div className={styles.bufferSelector}>
      <div className={styles.top}>
        <p className="p-bold">Buffer (±)</p>
        <button data-testid="buffer-info" type="button" onClick={infoClick}>
          <InfoIcon />
        </button>
      </div>
      <div className={styles.buffers}>
        <button
          className="p-bold"
          type="button"
          data-testid="buffer-0"
          data-active={active === 0}
          onClick={() => onClick(0)}
        >
          0
        </button>
        <button
          className="p-bold"
          type="button"
          data-testid="buffer-30"
          data-active={active === 30}
          onClick={() => onClick(30)}
        >
          30
        </button>
      </div>
    </div>
  );
};

export default BufferSelector;
