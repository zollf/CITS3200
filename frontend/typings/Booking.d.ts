interface StepComponent {
  (): JSX.Element | null;
  validationSchema: import('yup').ObjectSchema;
}

interface BookingContext {
  next: () => void;
  back: () => void;
  setLoading: (loading: bool) => void;
  setError: (error: string) => void;
  step: number;
  globalStartTime: string;
  globalEndTime: string;
  phone: string;
  hub: string;
  loading: boolean;
  bookingId: number;
  bufferInfo: string;
}

type Selected = 1;
type Unavailable = 2;
type Available = 3;

interface Bay {
  bayId: number;
  bayNum: number;
  times: Time[];
  desc: string;
}

interface BayResponse {
  bay_number: string;
  carpark: number;
  description: string;
  pk: number;
}

interface BaysBookedResponse {
  success: boolean;
  bays: {
    pk: number;
    bay: {
      bay_number: string;
      carpark: number;
      description: string;
      id: number;
    };
    end_time: string;
    start_time: string;
  }[];
}

interface Time {
  time: string;
  slug: string;
  status: number;
  bayNum: number;
  index: number;
  bayId: number;
  endTime: string;
  previousTime: string | null | undefined; // possible null or undefined as 00:00 doesn't have previous time
  row: number; // row that this time slot appears in the bay selection
  nextTimesEndTime: string;
}

interface PreprocessedTimes {
  [id: number]: {
    [time: string]: boolean;
  };
}

interface BaysInitialProps {
  bays: Bay[];
  times: string[];
  unavailable: PreprocessedTimes;
}

interface BayAction {
  type: 'toggle';
  bay: string;
  time: string;
}

interface Carpark {
  pk: string;
  description: string;
  google_maps_link: string;
  name: string;
}

interface BookingFormValues {
  carpark?: Carpark;
  booking: Map<string, Time>;
  date: Date;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rego?: string;
  company?: string;
  buffer: number;
}
