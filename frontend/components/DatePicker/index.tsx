import 'react-datepicker/dist/react-datepicker.css';

import React from 'react';
import DatePickerReact from 'react-datepicker';
import Calendar from '@/app/resources/static/images/calendar.svg';
import { addDays } from '@/frontend/lib/utils';

import styles from './styles.module.css';

interface Props {
  selected: Date;
  onChange: (date: Date) => void;
}

const DatePicker = ({ selected, onChange }: Props) => {
  return (
    <div className={styles.datePicker}>
      <Calendar />
      <DatePickerReact
        selected={selected}
        onChange={onChange}
        dateFormat="d/MM/yyyy"
        minDate={addDays(new Date(), 1)}
        data-testid="date"
      />
    </div>
  );
};

export default DatePicker;
