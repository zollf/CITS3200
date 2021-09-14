import React from 'react';
import styles from './styles.module.css';

enum ButtonType {
  submit = 'submit',
  reset = 'reset',
  button = 'button',
}

interface Props {
  type: ButtonType;
  iconLeft: boolean;
  icon: React.ReactNode;
  onClick: () => void;
  children: React.ReactChild;
}

const CustomButton = ({ type, iconLeft, icon, onClick, children }: Props) => {
  return (
    <button type={type} className={styles.custombutton} onClick={onClick}>
      {iconLeft ? '' : children} {icon} {iconLeft ? children : ''}
    </button>
  );
};

export { CustomButton, ButtonType };
