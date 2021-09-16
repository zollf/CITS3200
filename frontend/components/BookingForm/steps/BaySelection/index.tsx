import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormikContext } from 'formik';
import { getInitialState, selection } from '@/frontend/lib/BayInitialProps';

import styles from './styles.module.css';
import { CustomButton, ButtonType } from '@/frontend/components/CustomButton';
import Arrow from '@/app/resources/static/images/arrow.svg';

const BaySelection: StepComponent = () => {
  const [{ bays, times }] = useState<BaysInitialProps>(getInitialState());
  const [mouseDown, setMouseDown] = useState(false);
  const { values, setFieldValue } = useFormikContext<BookingFormValues>();

  const handleClick = (time: Time) => {
    if (time.status !== selection.UNAVAILABLE) {
      const booking = values.booking;
      booking.has(time.slug) ? booking.delete(time.slug) : booking.set(time.slug, time);
      setFieldValue('booking', booking);
    }
  };

  const onMouseDown = (time: Time) => {
    setMouseDown(true);
    handleClick(time);
  };

  const handleHover = (time: Time) => {
    if (mouseDown) {
      const booking = values.booking;
      booking.set(time.slug, time);
      setFieldValue('booking', booking);
    }
  };

  return (
    <div>
      <h2>Select bay for Admin Carpark North on 01/01/2000</h2>
      <CustomButton type={ButtonType.submit} iconLeft={false} icon={<Arrow />} onClick={() => null}>
        Continue
      </CustomButton>
      <div className={styles.table} onMouseLeave={() => setMouseDown(false)}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <p data-small-bold>BAY</p>
          </div>
          <div className={styles.times}>
            {times.map((t) => (
              <p key={`times-${t}`} data-small-bold>
                {t}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.bays}>
          {bays.map((bay: Bay, i) => (
            <div key={`bays-${bay.bayNum}`} className={styles.bay} data-light={i % 2 !== 0}>
              <div className={styles.left}>
                <p>{bay.bayNum}</p>
              </div>
              <div className={styles.bayTimes}>
                {bay.times.map((t: Time) => (
                  <button
                    key={t.slug}
                    onClick={() => handleClick(t)}
                    className={styles.bayTime}
                    data-unavailable={t.status === selection.UNAVAILABLE}
                    data-selected={values.booking.has(t.slug)}
                    onMouseDown={() => onMouseDown(t)}
                    onMouseUp={() => setMouseDown(false)}
                    onMouseOver={() => handleHover(t)}
                    onClickCapture={() => handleClick(t)}
                    type="button"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BaySelection.validationSchema = Yup.object().shape({});

export default BaySelection;
