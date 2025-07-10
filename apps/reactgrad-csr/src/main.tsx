// Core React and ReactDOM imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Reusable components from packages/* 
import { AppRenderer } from '@reactgrad/renderer';
import schema from '@reactgrad/schema';

// Editor experience
import { DevEditorWrapper } from '@reactgrad/editor';
const isEditor = import.meta.env.MODE === 'editor';

// Render the application'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isEditor ? <DevEditorWrapper initialSchema={schema} /> : <AppRenderer config={schema} />}
  </StrictMode>,
)
