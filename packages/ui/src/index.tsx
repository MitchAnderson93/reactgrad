import React from 'react';

// Export components
import { Header } from './components/Header';
import { Button } from './components/Button';
import { Modal } from './components/Modal'; 
<<<<<<< HEAD
import { Text } from './components/Text';
=======
>>>>>>> 7354c7f (WIP:DEV - Recent updates supporting multiple themes  (#2))

// Underlying functionality shared with renderer
import { Link as RouterLink } from 'react-router-dom';

// Export components individually so they can be imported directly
<<<<<<< HEAD
export { Header, Button, Modal, Text };
=======
export { Header, Button, Modal };
>>>>>>> 7354c7f (WIP:DEV - Recent updates supporting multiple themes  (#2))

// ThemeProvider and types which is wrapped around the renderer
export { ThemeProvider } from './themes/ThemeProvider';
export { getThemeFromConfig } from './themes/utils/GetTheme';

// Component map for renderer to use
export const componentMap: Record<string, React.FC<any>> = {
  Header,
  Button,
  Modal,
<<<<<<< HEAD
  Text,
=======
>>>>>>> 7354c7f (WIP:DEV - Recent updates supporting multiple themes  (#2))
  Link: ({ to, label }) => <RouterLink to={to}>{label}</RouterLink>,
};