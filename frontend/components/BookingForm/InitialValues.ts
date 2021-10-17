import { addDays } from '@/frontend/lib/utils';

const InitialValues: BookingFormValues = {
  carpark: undefined,
  date: addDays(new Date(), 1),
  booking: new Map(),
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  rego: '',
  company: '',
  buffer: 0,
};

export default InitialValues;
