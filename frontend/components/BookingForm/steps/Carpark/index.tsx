import React from 'react';
import * as Yup from 'yup';
import CarparkCard from '../../../CarparkCard';
import CustomButton from '../../../CustomButton';

const Carpark: StepComponent = () => {
  return (
    <div>
      <h2>UniPark VIP Booking</h2>
      <h3>Please pick a car park</h3>
      <p>Any additional enquiries, call 04 1234 5678</p>
      <CustomButton iconLeft={true} label={'next'} icon={null} onClick={() => null} />

      <CarparkCard
        name="Admin Carpark South"
        description="Carpark located somewhere."
        mapURL="https://goo.gl/maps/RytgNDB4MW8McDBY6"
      />
    </div>
  );
};

Carpark.validationSchema = Yup.object().shape({});

export default Carpark;
