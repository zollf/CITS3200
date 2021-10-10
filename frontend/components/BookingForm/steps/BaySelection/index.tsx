import React, { useCallback, useContext, useState } from 'react';
import ReactModal from 'react-modal';
import { useEffectOnce } from 'react-use';
import * as Yup from 'yup';
import Arrow from '@/app/resources/static/images/arrow.svg';
import DatePicker from '@/frontend/components/DatePicker';
import InfoIcon from '@/app/resources/static/images/info.svg';
import Reset from '@/app/resources/static/images/reset.svg';
import getCookie from '@/frontend/lib/GetCookie';
import { BookingContext } from '@/frontend/components/BookingForm/index';
import { ButtonType, CustomButton } from '@/frontend/components/CustomButton';
import { format } from 'date-fns';
import { getInitialState, selection } from '@/frontend/lib/BayInitialProps';
import { useFormikContext } from 'formik';

import styles from './styles.module.css';

const BaySelection: StepComponent = () => {
  const { values, setFieldValue } = useFormikContext<BookingFormValues>();
  const { globalStartTime, globalEndTime, setLoading, setError } = useContext<BookingContext>(BookingContext);
  const [props, setProps] = useState<BaysInitialProps>();
  const [modalDesc, setModalDesc] = useState<string | undefined>(undefined);

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
    setLoading(true);
    (async () => {
      try {
        setProps(
          getInitialState(
            await getBays(),
            await getBaysBooked(format(values.date, 'yyyy-MM-dd')),
            globalStartTime,
            globalEndTime,
          ),
        );
      } catch (e) {
        setError(`Something went wrong when fetching bays for carpark ${values.carpark?.name}`);
      }
      setLoading(false);
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
    setLoading(true);
    setFieldValue('booking', new Map());
    setFieldValue('date', date);
    (async () => {
      try {
        setProps(
          getInitialState(
            await getBays(),
            await getBaysBooked(format(date, 'yyyy-MM-dd')),
            globalStartTime,
            globalEndTime,
          ),
        );
      } catch (e) {
        setError(`Something went wrong when fetching bays for carpark ${values.carpark?.name}`);
      }
      setLoading(false);
    })();
  };

  if (!props) {
    // loading
    return null;
  }

  return (
    <>
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
                  {bay.desc && (
                    <button type="button" className={styles.additionInfo} onClick={() => setModalDesc(bay.desc)}>
                      <InfoIcon />
                    </button>
                  )}
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
      <ReactModal
        isOpen={!!modalDesc}
        shouldCloseOnEsc={true}
        onRequestClose={() => setModalDesc(undefined)}
        shouldCloseOnOverlayClick={true}
        className={styles.modal}
        ariaHideApp={false}
      >
        {modalDesc}
        <div className={styles.closeButton}>
          <CustomButton onClick={() => setModalDesc(undefined)} type={ButtonType.button} icon={undefined}>
            Close
          </CustomButton>
        </div>
      </ReactModal>
    </>
  );
};

BaySelection.validationSchema = Yup.object().shape({});

export default BaySelection;
