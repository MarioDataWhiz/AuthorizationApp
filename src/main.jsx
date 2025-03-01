import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '@asgardeo/auth-react';
import { asgardeoConfig } from './config/asgardeoConfig';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AuthProvider config={asgardeoConfig}>
    <App />
  </AuthProvider>
);
