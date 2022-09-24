import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import { BasisApp } from './BasisApp';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
        <BasisApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
