import React, { ReactChild } from 'react';
import styles from './styles.module.css';

enum ButtonType {
  submit = 'submit',
  reset = 'reset',
  button = 'button',
}

interface Props {
  type: ButtonType;
  iconLeft: boolean;
  Icon: React.ReactNode;
  onClick: () => void;
  children: ReactChild;
}

const CustomButton = ({ type, iconLeft, Icon, onClick, children }: Props) => {
  return (
    <button type={type} className={styles.custombutton} onClick={onClick}>
      {iconLeft ? '' : children} {Icon} {iconLeft ? children : ''}
    </button>
  );
};

export { CustomButton, ButtonType };
