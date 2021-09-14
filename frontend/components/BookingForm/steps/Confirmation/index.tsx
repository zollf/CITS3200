import React from 'react';
import { useFormikContext } from 'formik';
import BayBookings from '../Details/BayBookings';

const Confirmation = () => {
  const { values } = useFormikContext<BookingFormValues>();
  return (
    <div>
      <h2>Thank you uniart</h2>
      <h3 data-thin>
        {values.firstName} {values.lastName} will receive an email confirmation of the booking
      </h3>

      <BayBookings bayTimes={values.booking} />
    </div>
  );
};

export default Confirmation;
