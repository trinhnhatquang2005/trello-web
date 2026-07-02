import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import App from './App';
import { ToastContainer } from 'react-toastify';


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme} defaultMode="system" noSsr>
    <CssBaseline />
    <App />
    <ToastContainer />
  </ThemeProvider>
);