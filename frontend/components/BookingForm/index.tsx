import React, { useMemo, useState } from 'react';
import cc from 'classcat';
import Arrow from '@/app/resources/static/images/arrow.svg';
import { ButtonType, CustomButton } from '@/frontend/components/CustomButton';
import { Formik, FormikHelpers } from 'formik';

import InitialValues from './InitialValues';
import styles from './styles.module.css';
import Steps, { Confirmation } from './steps';

const BookingContext = React.createContext<BookingContext>({
  next: () => undefined,
  back: () => undefined,
  step: 0,
});

const BookingForm = () => {
  const [step, setStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const ActivePage = useMemo(() => Steps[step], [step]);
  const next = () => setStep(Math.min(step + 1, Steps.length - 1));
  const back = () => setStep(Math.max(step - 1, 0));

  const finalSubmit = (value: BookingFormValues) => {
    // todo
    const formData = new FormData();
    Object.keys(value).forEach((key) => formData.append(key, value[key]));
    return undefined;
  };

  const handleSubmit = (value: BookingFormValues, formikHelpers: FormikHelpers<BookingFormValues>) => {
    formikHelpers.setSubmitting(false);
    if (step === Steps.length - 1) {
      finalSubmit(value);
      setShowConfirmation(true);
    } else {
      next();
    }
  };

  return (
    <BookingContext.Provider value={{ next, back, step }}>
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
            {step > 0 && !showConfirmation && (
              <div className={styles.backButton}>
                <CustomButton type={ButtonType.button} iconLeft icon={<Arrow data-rotate />} onClick={() => back()}>
                  Back
                </CustomButton>
              </div>
            )}
            <div className={styles.currentStep}>{showConfirmation ? <Confirmation /> : <ActivePage />}</div>
          </form>
        )}
      </Formik>
    </BookingContext.Provider>
  );
};

export { BookingContext };
export default BookingForm;
