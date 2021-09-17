import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormikContext } from 'formik';

import CarparkCard from '../../../CarparkCard';
import styles from './styles.module.css';
import { BookingContext } from '../../';

const Carpark: StepComponent = () => {
  const [carparks, setCarparks] = useState<Carpark[]>();
  const { next } = useContext<BookingContext>(BookingContext);
  const { setFieldValue } = useFormikContext<BookingFormValues>();

  useEffect(() => {
    fetch('/api/carparks/').then(async (r) => setCarparks(await r.json()));
  }, []);

  const handleClick = (carpark: Carpark) => {
    setFieldValue('carpark', carpark);
    next();
  };

  return (
    <div className={styles.carpark}>
      <h2>UniPark VIP Booking</h2>
      <h3>Please pick a car park</h3>
      <p>
        Any additional enquiries, call <a href="">04 1234 5678</a>
      </p>
      <div className={styles.cards}>
        {carparks?.map((c) => (
          <CarparkCard
            onClick={() => handleClick(c)}
            name={c.name}
            description={c.description}
            mapURL={c.google_maps_link}
          />
        ))}
      </div>
    </div>
  );
};

Carpark.validationSchema = Yup.object().shape({});

export default Carpark;
