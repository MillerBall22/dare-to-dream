import React from 'react';
import { createRoot, render } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { store, persistor } from './store/store';

import StoreProvider from "./store/store-context";

import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </StoreProvider>
  </React.StrictMode>,
);