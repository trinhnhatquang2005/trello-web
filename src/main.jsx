import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import App from './App';
import { ToastContainer } from 'react-toastify';
// Cấu hình MUI Dialog
import { ConfirmProvider } from 'material-ui-confirm'

// Cấu hình Redux Store
import { Provider } from 'react-redux'
import { store } from '~/redux/store'

// Cấu hình react-router-dom với BrowserRouter
import { BrowserRouter } from 'react-router-dom'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <ThemeProvider theme={theme} defaultMode="system" noSsr>
        <ConfirmProvider defaultOptions={{
          allowClose: false,
          dialogProps: { maxWidth: 'xs' },
          buttonOrder: ['confirm', 'cancel'],
          cancellationButtonProps: { color: 'inherit' },
          confirmationButtonProps: { color: 'secondary', variant: 'outlined' }
        }}>
          <CssBaseline />
          <App />
          <ToastContainer position="bottom-left" theme="colored" />
        </ConfirmProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);