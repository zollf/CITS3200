interface StepComponent {
  (): JSX.Element;
  validationSchema: import('yup').ObjectSchema;
}

interface BookingContext {
  next: () => void;
  back: () => void;
  step: number;
}
type Selected = 1;
type Unavailable = 2;
type Available = 3;

interface Bay {
  bayNum: number;
  times: Time[];
}

interface Time {
  time: string;
  slug: string;
  status: Booking.Unavailable | Booking.Selected | Booking.Available;
  bayNum: number;
  index: number;
}

interface BaysInitialProps {
  bays: Bay[];
  times: string[];
}

interface BayAction {
  type: 'toggle';
  bay: string;
  time: string;
}

interface Carpark {
  description: string;
  google_maps_link: string;
  name: string;
}

interface BookingFormValues {
  carpark?: Carpark;
  booking: Map<string, Time>;
  date: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rego?: string;
  company?: string;
}
