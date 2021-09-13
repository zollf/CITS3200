import React from 'react';
import styles from './styles.module.css';

interface Props {
  label: string;
  iconLeft: boolean;
  icon: React.ReactNode;
  onClick: () => void;
}

const CustomButton = ({ label, iconLeft, icon, onClick }: Props) => {
  return (
    <button className={styles.custombutton} onClick={onClick}>
      {' '}
      {label}{' '}
    </button>
  );
};

export default CustomButton;
