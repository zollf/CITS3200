import React from 'react';
// import Tick from '@/app/resources/static/images/done.svg';
// import styles from './styles.module.css';

import CarparkCard from '../CarparkCard/CarparkCard';

const Home = () => {
  return (
    <div>
      Hello from React! jayden here check test

      <CarparkCard
        carpark = {{
          name:"Admin Carpark North",
          description:"Carpark located somewhere." ,
          mapURL:"https://goo.gl/maps/RytgNDB4MW8McDBY6" ,
        }}  
      />

    </div>
  );
};

export default Home;
