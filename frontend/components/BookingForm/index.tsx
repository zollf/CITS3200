import React, { useMemo, useState } from 'react';
import cc from 'classcat';
import Arrow from '@/app/resources/static/images/arrow.svg';
import Help from '@/app/resources/static/images/help.svg';
import { ButtonType, CustomButton } from '@/frontend/components/CustomButton';
import { format } from 'date-fns';
import { Formik, FormikHelpers } from 'formik';
import createListItems from '@/frontend/lib/ProcessBayMap';
import getCookie from '@/frontend/lib/GetCookie';

import InitialValues from './InitialValues';
import styles from './styles.module.css';
import Steps, { Confirmation } from './steps';

import ReactModal from 'react-modal';
import { useEffectOnce } from 'react-use';

interface Props {
  globalStartTime: string;
  globalEndTime: string;
  phone: string;
  userId: string | null;
  hub: string;
}

// istanbul ignore next
const BookingContext = React.createContext<BookingContext>({
  next: () => undefined,
  back: () => undefined,
  step: 0,
  globalStartTime: '00:00',
  globalEndTime: '00:00',
  phone: '04 1234 5678',
  hub: '',
});

const BookingForm = ({ globalStartTime, globalEndTime, phone, userId, hub }: Props) => {
  const [step, setStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [, setError] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [documentation, setDocumentation] = useState<string[]>([]);

  useEffectOnce(() => {
    const getSettings = async () => {
      const response = await fetch('/admin/settings_list');
      const json = await response.json();
      setDocumentation([...new Array(Steps.length)].map((_, i) => json[`help${i}`]));
    };
    getSettings();
  });

  const ActivePage = useMemo(() => Steps[step], [step]);
  const next = () => setStep(Math.min(step + 1, Steps.length - 1));
  const back = () => setStep(Math.max(step - 1, 0));

  const finalSubmit = async (values: BookingFormValues) => {
    const data = {
      booking: {
        carpark: values.carpark!.pk,
        date: format(values.date, 'yyyy-MM-dd'),
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        rego: values.rego,
        company: values.company,
        phone: values.phone,
        user: userId,
      },
      bays: createListItems(values.booking).map((b) => ({
        bay: b[0]?.bayId,
        start_time: b[0]?.time,
        end_time: b[1]?.time || b[0]?.time,
      })),
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')!,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return true;
      }
    } catch (e) {
      return false;
      // handle error error
    }
    return false;
  };

  const handleSubmit = async (value: BookingFormValues, formikHelpers: FormikHelpers<BookingFormValues>) => {
    formikHelpers.setSubmitting(false);
    if (step === Steps.length - 1) {
      if (await finalSubmit(value)) {
        setShowConfirmation(true);
      } else {
        setError(true);
      }
    } else {
      next();
    }
  };

  if (documentation.length == 0) return null;

  return (
    <BookingContext.Provider value={{ next, back, step, globalStartTime, globalEndTime, phone, hub }}>
      <Formik<BookingFormValues>
        initialValues={InitialValues}
        validationSchema={ActivePage.validationSchema}
        onSubmit={handleSubmit}
        validateOnChange
      >
        {({ handleSubmit, isSubmitting }) => (
          <form
            onSubmit={handleSubmit}
            className={cc({
              [styles.bookingForm]: true,
              [styles.submitting]: isSubmitting,
            })}
          >
            {!showConfirmation && (
              <div className={styles.helpButton}>
                <CustomButton
                  type={ButtonType.button}
                  icon={<Help />}
                  iconLeft={false}
                  onClick={() => setShowHelp(true)}
                >
                  Need Help
                </CustomButton>
              </div>
            )}
            {step > 0 && !showConfirmation && (
              <div className={styles.backButton}>
                <CustomButton
                  type={ButtonType.button}
                  iconLeft={true}
                  icon={<Arrow data-rotate />}
                  onClick={() => back()}
                >
                  Back
                </CustomButton>
              </div>
            )}
            <div className={styles.currentStep}>{showConfirmation ? <Confirmation /> : <ActivePage />}</div>
          </form>
        )}
      </Formik>

      <ReactModal
        isOpen={showHelp}
        shouldCloseOnEsc={true}
        onRequestClose={() => setShowHelp(false)}
        shouldCloseOnOverlayClick={true}
        className={styles.modal}
      >
        {documentation[step]}
        <div className={styles.closeButton}>
          <CustomButton onClick={() => setShowHelp(false)} type={ButtonType.button} icon={undefined}>
            Close
          </CustomButton>
        </div>
      </ReactModal>
    </BookingContext.Provider>
  );
};

export { BookingContext };
export default BookingForm;
