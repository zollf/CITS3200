import React, { useMemo } from 'react';
import { renderCleanedTimes } from '@/frontend/lib/ProcessBayMap';

import styles from './styles.module.css';

interface Props {
  bayTimes: Map<string, Time>;
  buffer?: number;
}

const BayBookings = ({ bayTimes, buffer }: Props) => {
  const listItems = useMemo(() => renderCleanedTimes(bayTimes, buffer), [bayTimes]);

  return (
    <table className={styles.bayTimes}>
      <thead>
        <tr>
          <th>Bay</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>{listItems}</tbody>
    </table>
  );
};

export default BayBookings;
