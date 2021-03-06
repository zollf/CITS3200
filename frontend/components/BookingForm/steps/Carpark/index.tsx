import React, { useContext, useState } from 'react';
import { useEffectOnce } from 'react-use';
import * as Yup from 'yup';
import { BookingContext } from '@/frontend/components/BookingForm/index';
import { useFormikContext } from 'formik';

import CarparkCard from '../../../CarparkCard';
import styles from './styles.module.css';

const Carpark: StepComponent = () => {
  const [carparks, setCarparks] = useState<Carpark[]>();
  const { next, phone, hub, setLoading, loading, setError } = useContext<BookingContext>(BookingContext);
  const { setFieldValue, values } = useFormikContext<BookingFormValues>();

  useEffectOnce(() => {
    setLoading(true);
    fetch('/api/carparks/')
      .then((r) =>
        r.json().then((r) => {
          setCarparks(r);
        }),
      )
      .catch(() => {
        setError('Something went wrong when fetching carpark data.');
      });
    setLoading(false);
  });

  const handleClick = (carpark: Carpark) => {
    if (values?.carpark && values.carpark.name != carpark.name) {
      setFieldValue('booking', new Map()); // reset bookings every time they pick a new carpark
    }
    setFieldValue('carpark', carpark);
    next();
  };

  if (!carparks) {
    return null;
  }

  return (
    <div className={styles.carpark} data-testid="carpark-step" data-loading={loading}>
      <h2>UniPark VIP Booking</h2>
      <h3>Welcome {hub}. Please pick a car park</h3>
      <p>
        Any additional enquiries, call <a href={`tel:${phone}`}>{phone}</a>
      </p>
      <div className={styles.cards} data-testid="carpark-cards">
        {carparks.map((c) => (
          <CarparkCard
            key={c.name}
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
