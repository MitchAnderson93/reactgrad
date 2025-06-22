import React from 'react';
import styles from './Header.module.scss';

export const Header = ({ text }: { text: string }) => (
  <h1 className={styles.header}>{text}</h1>
);
