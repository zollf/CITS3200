import React, { ReactChild } from 'react';
import styles from './styles.module.css';

interface Props {
  iconLeft: boolean;
  Icon: React.ReactNode;
  onClick: () => void;
  children: ReactChild;
}

const CustomButton = ({ iconLeft, Icon, onClick, children }: Props) => {
  return (
    <button className={styles.custombutton} onClick={onClick}>
      {iconLeft ? children : ''} {Icon} {iconLeft ? '' : children}
    </button>
  );
};

export default CustomButton;
