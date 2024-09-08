// import React from 'react';
import '@mantine/core/styles.css';

import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <MantineProvider>
    <App />
  </MantineProvider>
);
