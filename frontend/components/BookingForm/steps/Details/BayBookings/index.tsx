import React, { useMemo } from 'react';
import { renderCleanedTimes } from '@/frontend/lib/ProcessBayMap';

import styles from './styles.module.css';

interface Props {
  bayTimes: Map<string, Time>;
}

const BayBookings = ({ bayTimes }: Props) => {
  const listItems = useMemo(() => renderCleanedTimes(bayTimes), [bayTimes]);

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
