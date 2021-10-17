import React from 'react';
import * as Yup from 'yup';
import CarparkCard from '@/frontend/components/CarparkCard';
import Done from '@/app/resources/static/images/done.svg';
import Field from '@/frontend/components/Field';
import { ButtonType, CustomButton } from '@/frontend/components/CustomButton';
import { useFormikContext } from 'formik';

import BayBookings from './BayBookings';
import styles from './styles.module.css';

const Details: StepComponent = () => {
  const { values } = useFormikContext<BookingFormValues>();

  return (
    <div className={styles.details}>
      <div className={styles.detailsTop}>
        <h2>Booking Details</h2>
        <h3 data-thin>Please fill in details for the person that will be parking</h3>
      </div>
      <div className={styles.detailsContent}>
        <div className={styles.detailsLeft}>
          <CarparkCard
            name={values.carpark!.name}
            mapURL={values.carpark!.google_maps_link}
            description={values.carpark!.description}
            hover={false}
          />
          <Field label="Date" name="date" type="data" value={values.date.toDateString()} disabled />
          <BayBookings bayTimes={values.booking} buffer={values.buffer} />
        </div>
        <div className={styles.detailsRight}>
          <Field label="First Name" name="firstName" required />
          <Field label="Last Name" name="lastName" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Phone" name="phone" type="tel" pattern="[+]?[0-9]{6,}" required />
          <Field label="Rego (Optional)" name="rego" />
          <Field label="Company (Optional)" name="company" />
          <CustomButton type={ButtonType.submit} iconLeft={false} icon={<Done />} onClick={() => null}>
            Submit
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

Details.validationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
  rego: Yup.string(),
  company: Yup.string(),
});

export default Details;
