// Core React and ReactDOM imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Reusable components from packages/* 
import { AppRenderer } from '@reactgrad/renderer';
import schema from '@reactgrad/schema';

// Render the application'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRenderer config={schema} />
  </StrictMode>,
)
