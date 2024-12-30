import React from 'react'; // Explicitly import React for JSX (required in some environments)
import { StrictMode } from 'react';
import { Buffer } from 'buffer';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Polyfill for Buffer in browser environments
window.Buffer = Buffer;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
