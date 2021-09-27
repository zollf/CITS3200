import React, { useContext } from 'react';
import Arrow from '@/app/resources/static/images/arrow.svg';
import CarparkCard from '@/frontend/components/CarparkCard';
import Field from '@/frontend/components/Field';
import { BookingContext } from '@/frontend/components/BookingForm/index';
import { ButtonType, CustomButton } from '@/frontend/components/CustomButton';
import { useFormikContext } from 'formik';

import BayBookings from '../Details/BayBookings';
import styles from './styles.module.css';

const Confirmation = () => {
  const { hub } = useContext<BookingContext>(BookingContext);
  const { values } = useFormikContext<BookingFormValues>();

  return (
    <div>
      <h2>Thank you {hub}</h2>
      <h3 data-thin>
        {values.firstName} {values.lastName} will receive an email confirmation of the booking
      </h3>
      <div className={styles.outputs}>
        <CarparkCard
          name={values.carpark!.name}
          description={values.carpark!.description}
          mapURL={values.carpark!.google_maps_link}
        />
        <Field label="Date" name="date" type="data" value={values.date.toDateString()} disabled />
        <BayBookings bayTimes={values.booking} />
      </div>
      <CustomButton
        type={ButtonType.button}
        iconLeft={false}
        icon={<Arrow />}
        onClick={() => (window.location.href = '/')}
      >
        Return
      </CustomButton>
    </div>
  );
};

export default Confirmation;
