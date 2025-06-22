import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Export components
import { Header } from './components/Header';
import { Button } from './components/Button';

export const componentMap: Record<string, React.FC<any>> = {
  Header,
  Button,
  Link: ({ to, label }) => <RouterLink to={to}>{label}</RouterLink>,
};
