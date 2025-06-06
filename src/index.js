import React from 'react';
import { createRoot, render } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import { Elements } from "@stripe/react-stripe-js";
// import { stripePromise } from './utils/stripe/stripe.utils';

import App from './App';
import { store, persistor } from './store/store';

import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          {/* <Elements stripe={stripePromise}> */}
            <App />
          {/* //</Elements> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);