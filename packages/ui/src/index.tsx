import React from 'react';

// Export components
import { Header } from './components/Header';
import { Button } from './components/Button';

// Underlying functionality shared with renderer
import { Link as RouterLink } from 'react-router-dom';

// ThemeProvider and types which is wrapped around the renderer
export { ThemeProvider } from './themes/ThemeProvider';
export { getThemeFromConfig } from './themes/utils/GetTheme';
export type { TokenRegistry } from './themes/utils/types';

// Component map for renderer to use
export const componentMap: Record<string, React.FC<any>> = {
  Header,
  Button,
  Link: ({ to, label }) => <RouterLink to={to}>{label}</RouterLink>,
};

