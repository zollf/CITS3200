import React, { useState } from 'react';
import * as Yup from 'yup';
import Arrow from '@/app/resources/static/images/arrow.svg';
import Reset from '@/app/resources/static/images/reset.svg';
import Calendar from '@/app/resources/static/images/calendar.svg';

import { ButtonType, CustomButton } from '@/frontend/components/CustomButton';
import { getInitialState, selection } from '@/frontend/lib/BayInitialProps';
import { useFormikContext } from 'formik';

import styles from './styles.module.css';

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

  const handleReset = () => {
    setFieldValue('booking', new Map());
  };

  return (
    <div className={styles.baysSelection}>
      <h2>
        Select bay for <span className={styles.blue}>{values.carpark!.name}</span> on {values.date}
      </h2>

      <div className={styles.legends}>
        <div className={styles.legend}>
          <div className={styles.greenSquare} />
          <p>Selected</p>
        </div>

        <div className={styles.legend}>
          <div className={styles.redSquare} />
          <p>Unavailable</p>
        </div>

        <div className={styles.legend}>
          <div className={styles.yellowSquare} />
          <p>Available</p>
        </div>
      </div>

      <div className={styles.bayButtons}>
        <div className={styles.bayButtonsLeft}>
          <CustomButton onClick={handleReset} type={ButtonType.button} iconLeft icon={<Calendar />}>
            Date
          </CustomButton>
        </div>
        <div className={styles.bayButtonsRight}>
          <CustomButton onClick={handleReset} type={ButtonType.button} icon={<Reset />}>
            Reset
          </CustomButton>
          <CustomButton type={ButtonType.submit} icon={<Arrow />} disabled={!values.booking.size}>
            Continue
          </CustomButton>
        </div>
      </div>

      <div className={styles.table} data-testid="table" onMouseLeave={() => setMouseDown(false)}>
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
                    data-testid="bay-time"
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
