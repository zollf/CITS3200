import React from 'react';
import { useFormikContext } from 'formik';

const Confirmation = () => {
  const { values } = useFormikContext<BookingFormValues>();
  return (
    <div>
      <h2>Thank you uniart</h2>
      <h3 data-thin>
        {values.firstName} {values.lastName} will receive an email confirmation of the booking
      </h3>
    </div>
  );
};

export default Confirmation;
