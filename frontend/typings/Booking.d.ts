interface StepComponent {
  (): JSX.Element;
  validationSchema: import('yup').ObjectSchema;
}

interface BookingContext {
  next: () => void;
  back: () => void;
  step: number;
}

interface BookingFormValues {
  carpark: any;
  booking: any;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rego?: string;
  company?: string;
}
