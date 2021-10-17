import React, { useMemo, useState } from 'react';
import ReactModal from 'react-modal';
import { useEffectOnce } from 'react-use';
import cc from 'classcat';
import Arrow from '@/app/resources/static/images/arrow.svg';
import Help from '@/app/resources/static/images/help.svg';
import { ButtonType, CustomButton } from '@/frontend/components/CustomButton';
import { format } from 'date-fns';
import { Formik, FormikHelpers } from 'formik';
import createListItems from '@/frontend/lib/ProcessBayMap';
import getCookie from '@/frontend/lib/GetCookie';
import Spinner from '@atlaskit/spinner';

import InitialValues from './InitialValues';

import Steps, { Confirmation } from './steps';

import styles from './styles.module.css';

interface Props {
  globalStartTime: string;
  globalEndTime: string;
  phone: string;
  userId: string | null;
  hub: string;
  bufferInfo: string;
}

// istanbul ignore next
const BookingContext = React.createContext<BookingContext>({
  next: () => undefined,
  back: () => undefined,
  setLoading: () => undefined,
  setError: () => undefined,
  step: 0,
  globalStartTime: '00:00',
  globalEndTime: '00:00',
  phone: '04 1234 5678',
  hub: '',
  loading: false,
  bookingId: -1,
  bufferInfo: '',
});

const BookingForm = ({ globalStartTime, globalEndTime, phone, userId, hub, bufferInfo }: Props) => {
  const [step, setStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [documentation, setDocumentation] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(-1);

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
  const closeModal = () => setShowHelp(false);

  const finalSubmit = async (values: BookingFormValues) => {
    setLoading(true);
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
      bays: createListItems(values.booking).map((b) => {
        if (values.buffer === 30) {
          return {
            bay: b[0].bayId,
            start_time: b[0].previousTime,
            end_time: b[1]?.nextTimesEndTime || b[0].nextTimesEndTime,
          };
        }

        return {
          bay: b[0].bayId,
          start_time: b[0].time,
          end_time: b[1]?.endTime || b[0].endTime,
        };
      }),
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')!,
        },
        body: JSON.stringify(data),
      }).then((r) => r.json());
      setLoading(false);
      if (response?.success) {
        setBookingId(response['booking_id']);
        return true;
      } else {
        if (response?.error) {
          setError(response.error);
        } else if (response?.errors) {
          const firstKey = Object.keys(response?.errors)[0];
          setError(`${firstKey}: ${response?.errors[firstKey]}`);
        } else {
          setError('Something went wrong');
        }
        return false;
      }
    } catch (e) {
      setError('Something went wrong');
      setLoading(false);
      return false;
    }
  };

  const handleSubmit = async (value: BookingFormValues, formikHelpers: FormikHelpers<BookingFormValues>) => {
    if (step === Steps.length - 1) {
      if (await finalSubmit(value)) {
        setError('');
        setShowConfirmation(true);
      }
    } else {
      setError('');
      next();
    }

    formikHelpers.setTouched({});
    formikHelpers.setErrors({});
    formikHelpers.setSubmitting(false);
  };

  if (documentation.length == 0) return null;

  return (
    <BookingContext.Provider
      value={{
        next,
        back,
        step,
        globalStartTime,
        globalEndTime,
        phone,
        hub,
        setLoading,
        loading,
        setError,
        bookingId,
        bufferInfo,
      }}
    >
      <Formik<BookingFormValues>
        initialValues={InitialValues}
        validationSchema={ActivePage.validationSchema}
        onSubmit={handleSubmit}
        validateOnChange
      >
        {({ handleSubmit }) => (
          <>
            {loading && (
              <div className={styles.loading}>
                <Spinner size="xlarge" />
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className={cc({
                [styles.bookingForm]: true,
                [styles.isLoading]: loading,
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
              {error && <div className={styles.error}>{error}</div>}
              <div className={styles.currentStep}>{showConfirmation ? <Confirmation /> : <ActivePage />}</div>
            </form>
          </>
        )}
      </Formik>

      <ReactModal
        isOpen={showHelp}
        shouldCloseOnEsc={true}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        className={styles.modal}
        ariaHideApp={false}
      >
        {documentation[step]}
        <div className={styles.closeButton}>
          <CustomButton onClick={closeModal} type={ButtonType.button} icon={undefined}>
            Close
          </CustomButton>
        </div>
      </ReactModal>
    </BookingContext.Provider>
  );
};

export { BookingContext };
export default BookingForm;
