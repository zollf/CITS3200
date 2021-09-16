import React, { useContext, useState, useEffect } from 'react';
import * as Yup from 'yup';
import CarparkCard from '../../../CarparkCard';
import { BookingContext } from '../../';
import { useFormikContext } from 'formik';

import styles from './styles.module.css';

const Carpark: StepComponent = () => {
  const [carparks, setCarparks] = useState<Carpark[]>();
  const { next } = useContext<BookingContext>(BookingContext);
  const { setFieldValue } = useFormikContext<BookingFormValues>();

  useEffect(() => {
    fetch('/api/carparks/').then(async (r) => setCarparks(await r.json()));
  }, []);

  const handleClick = (carpark: Carpark) => {
    setFieldValue('carparks', carpark);
    next();
  };

  return (
    <div className={styles.carpark}>
      <h2>UniPark VIP Booking</h2>
      <h3>Please pick a car park</h3>
      <p>Any additional enquiries, call 04 1234 5678</p>
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
