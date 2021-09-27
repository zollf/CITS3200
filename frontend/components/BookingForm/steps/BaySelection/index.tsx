import React, { useCallback, useContext, useState } from 'react';
import { useEffectOnce } from 'react-use';
import * as Yup from 'yup';
import Arrow from '@/app/resources/static/images/arrow.svg';
import DatePicker from '@/frontend/components/DatePicker';
import Reset from '@/app/resources/static/images/reset.svg';
import getCookie from '@/frontend/lib/GetCookie';
import { ButtonType, CustomButton } from '@/frontend/components/CustomButton';
import { format } from 'date-fns';
import { getInitialState, selection } from '@/frontend/lib/BayInitialProps';
import { useFormikContext } from 'formik';

import styles from './styles.module.css';
import { BookingContext } from '@/frontend/components/BookingForm/index';

const BaySelection: StepComponent = () => {
  const { values, setFieldValue } = useFormikContext<BookingFormValues>();
  const { globalStartTime, globalEndTime } = useContext<BookingContext>(BookingContext);
  const [props, setProps] = useState<BaysInitialProps>();

  const getBays = useCallback(async () => {
    return await fetch(`/api/carparks/${values.carpark!.pk}/bays`).then((r) => r.json());
  }, [values.carpark]);

  const getBaysBooked = useCallback(
    async (date: string) => {
      return await fetch(`/api/bays-booked`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')!,
        },
        body: JSON.stringify({
          date: date, //format(values.date, 'yyyy-MM-dd'),
          carpark: values.carpark!.pk,
        }),
      }).then((r) => r.json());
    },
    [values.carpark, values.date],
  );

  useEffectOnce(() => {
    (async () => {
      setProps(
        getInitialState(
          await getBays(),
          await getBaysBooked(format(values.date, 'yyyy-MM-dd')),
          globalStartTime,
          globalEndTime,
        ),
      );
    })();
  });

  const [mouseDown, setMouseDown] = useState<number | null>(null);

  const handleClick = (time: Time) => {
    if (time.status !== selection.UNAVAILABLE) {
      const booking = values.booking;
      booking.has(time.slug) ? booking.delete(time.slug) : booking.set(time.slug, time);
      setFieldValue('booking', booking);
    }
  };

  const onMouseDown = (time: Time) => {
    // so if we mouse down on something AVAILABLE, we want to be able to drag/hover to make things UNAVAILABLE and vis versa
    setMouseDown(values.booking.has(time.slug) ? selection.UNAVAILABLE : selection.AVAILABLE);
    handleClick(time);
  };

  const handleHover = (time: Time) => {
    if (mouseDown === selection.UNAVAILABLE) {
      const booking = values.booking;
      booking.delete(time.slug);
      setFieldValue('booking', booking);
    } else if (mouseDown === selection.AVAILABLE) {
      const booking = values.booking;
      booking.set(time.slug, time);
      setFieldValue('booking', booking);
    }
  };

  const handleReset = () => {
    setFieldValue('booking', new Map());
  };

  const handleDateChange = (date: Date) => {
    setFieldValue('booking', new Map());
    setFieldValue('date', date);
    (async () => {
      setProps(
        getInitialState(
          await getBays(),
          await getBaysBooked(format(date, 'yyyy-MM-dd')),
          globalStartTime,
          globalEndTime,
        ),
      );
    })();
  };

  if (!props) {
    // loading
    return null;
  }

  return (
    <div className={styles.baysSelection}>
      <h2>
        Select bay for <span className={styles.blue}>{values.carpark!.name}</span> on {values.date.toDateString()}
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
          <DatePicker selected={values.date} onChange={handleDateChange} />
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

      <div className={styles.table} data-testid="table" onMouseLeave={() => setMouseDown(null)}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <p data-small-bold>BAY</p>
          </div>
          <div className={styles.times}>
            {props.times.map((t) => (
              <p key={`times-${t}`} data-small-bold>
                {t}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.bays}>
          {props.bays.map((bay: Bay, i) => (
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
                    onMouseUp={() => setMouseDown(null)}
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
