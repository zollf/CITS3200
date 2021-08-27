import React from 'react';
import * as Yup from 'yup';

const BaySelection: StepComponent = () => {
  return (
    <div>
      <h2>Select bay for Admin Carpark North on 01/01/2000</h2>
      <button type="submit">Next</button>
    </div>
  );
};

BaySelection.validationSchema = Yup.object().shape({});

export default BaySelection;
