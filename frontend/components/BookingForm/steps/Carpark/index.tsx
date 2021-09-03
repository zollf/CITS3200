import React from 'react';
import * as Yup from 'yup';

const Carpark: StepComponent = () => {
  return (
    <div>
      <h2>UniPark VIP Booking</h2>
      <h3>Please pick a car park</h3>
      <p>Any additional enquiries, call 04 1234 5678</p>
      <button type="submit">Next</button>
    </div>
  );
};

Carpark.validationSchema = Yup.object().shape({});

export default Carpark;
