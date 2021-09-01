import React, { useMemo } from 'react';
import cc from 'classcat';
import { Field as FormikField, useFormikContext } from 'formik';

import styles from './styles.module.css';

interface Props {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
}

const Field = ({ name, label, required = false, type = 'text' }: Props) => {
  const { errors, touched, values } = useFormikContext<Record<string, unknown>>();
  const invalid = useMemo(() => errors[name] && touched[name], [errors, touched]);

  return (
    <div className={cc({ [styles.field]: true, [styles.invalid]: invalid })}>
      <label htmlFor={name}>{label}</label>
      <FormikField name={name} value={values[name]} type={type} invalid={invalid} required={required} />
    </div>
  );
};

export default Field;
