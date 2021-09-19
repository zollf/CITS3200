import React from 'react';
import { useFormikContext } from 'formik';
import BayBookings from '../Details/BayBookings';
import CarparkCard from '@/frontend/components/CarparkCard';
import Field from '@/frontend/components/Field';
import styles from './styles.module.css';

const Confirmation = () => {
  const { values } = useFormikContext<BookingFormValues>();
  return (
    <div>
      <h2>Thank you {values.hub}</h2>
      <h3 data-thin>
        {values.firstName} {values.lastName} will receive an email confirmation of the booking
      </h3>
      <div className={styles.outputs}>
        <CarparkCard
          name={values.carpark!.name}
          description={values.carpark!.description}
          mapURL={values.carpark!.google_maps_link}
        />
        <Field label="Date" name="date" type="data" value={values.date} />
        <BayBookings bayTimes={values.booking} />
      </div>
    </div>
  );
};

export default Confirmation;
