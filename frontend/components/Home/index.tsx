import React from 'react';
import Tick from '@/app/resources/static/images/done.svg';
import styles from './styles.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      Hello from React! 2.0
      <Tick />
    </div>
  );
};

export default Home;
