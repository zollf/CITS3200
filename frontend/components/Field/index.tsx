import React, { useMemo } from 'react';
import cc from 'classcat';
import { Field as FormikField, useFormikContext } from 'formik';

interface Props {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  value?: string;
  disabled?: boolean;
}

const Field = ({ name, label, required = false, type = 'text', value, disabled = false }: Props) => {
  const { errors, touched, values } = useFormikContext<Record<string, unknown>>();
  const invalid = useMemo(() => errors[name] && touched[name], [errors, touched]);

  return (
    <div className={cc({ field: true, invalid })}>
      <label className="p-bold" htmlFor={name}>
        {label}
      </label>
      <FormikField
        name={name}
        value={value || values[name]}
        type={type}
        invalid={invalid?.toString()}
        required={required}
        data-testid={name}
        disabled={disabled}
      />
    </div>
  );
};

export default Field;
