import React from 'react';

// Export components
import { Header } from './components/Header';
import { Button } from './components/Button';
import { Modal } from './components/Modal'; 
import { Text } from './components/Text';

// Underlying functionality shared with renderer
import { Link as RouterLink } from 'react-router-dom';

// Export components individually so they can be imported directly
export { Header, Button, Modal, Text };

// ThemeProvider and types which is wrapped around the renderer
export { ThemeProvider } from './themes/ThemeProvider';
export { getThemeFromConfig } from './themes/utils/GetTheme';
export type { TokenRegistry } from './types';

// Component map for renderer to use
export const componentMap: Record<string, React.FC<any>> = {
  Header,
  Button,
  Modal,
  Text,
  Link: ({ to, label }) => <RouterLink to={to}>{label}</RouterLink>,
};