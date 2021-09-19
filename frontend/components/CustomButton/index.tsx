import React from 'react';
import cc from 'classcat';

import styles from './styles.module.css';

enum ButtonType {
  submit = 'submit',
  reset = 'reset',
  button = 'button',
}

interface Props {
  type: ButtonType;
  iconLeft?: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
  children: React.ReactChild;
  disabled?: boolean;
}

const CustomButton = ({ type, iconLeft = false, icon, onClick, children, disabled = false }: Props) => {
  return (
    <button
      type={type}
      className={cc({ [styles.custombutton]: true, [styles.iconLeft]: iconLeft, [styles.disabled]: disabled })}
      onClick={onClick}
      disabled={disabled}
    >
      {iconLeft ? '' : children} {icon} {iconLeft ? children : ''}
    </button>
  );
};

export { CustomButton, ButtonType };
