const InitialValues: BookingFormValues = {
  carpark: undefined,
  date: new Date().toDateString(),
  booking: new Map(),
  hub: 'uniart',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  rego: '',
  company: '',
};

export default InitialValues;
