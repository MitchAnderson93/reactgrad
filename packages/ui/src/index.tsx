import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const componentMap: Record<string, React.FC<any>> = {
  Heading: ({ text }) => <h1>{text}</h1>,
  Button: ({ label }) => <button>{label}</button>,
  Link: ({ to, label }) => <RouterLink to={to}>{label}</RouterLink>
};