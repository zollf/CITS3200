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
  customClass?: any;
}
console.log(typeof styles.custombutton);
const CustomButton = ({ type, iconLeft = false, icon, onClick, children, disabled = false, customClass }: Props) => {
  return (
    <button
      type={type}
      className={cc({
        [styles.custombutton]: true,
        [styles.iconLeft]: iconLeft,
        [styles.disabled]: disabled,
        [customClass]: !!customClass,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {iconLeft ? '' : children} {icon} {iconLeft ? children : ''}
    </button>
  );
};

export { CustomButton, ButtonType };
