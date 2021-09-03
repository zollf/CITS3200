import React from 'react';
import * as Yup from 'yup';
import Field from '@/frontend/components/Field';

const Details: StepComponent = () => {
  return (
    <div>
      <h2>Booking Details</h2>
      <h3 data-thin>Please fill in details for the person that will be parking</h3>
      <Field label="First Name" name="firstName" required />
      <Field label="Last Name" name="lastName" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone" name="phone" required />
      <Field label="Rego" name="rego" />
      <Field label="Company" name="company" />
      <button type="submit">Submit</button>
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
