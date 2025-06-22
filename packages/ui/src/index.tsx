import React from 'react';

export const componentMap: Record<string, React.FC<any>> = {
  Heading: ({ text }) => <h1>{text}</h1>,
  Button: ({ label }) => <button>{label}</button>,
};