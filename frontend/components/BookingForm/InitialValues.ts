import { addDays } from '@/frontend/lib/utils';

const InitialValues: BookingFormValues = {
  carpark: undefined,
  date: addDays(new Date(), 1),
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
