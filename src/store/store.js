
import { configureStore } from '@reduxjs/toolkit';
import { apisSlice } from './apis';
import { authSlice } from './auth';
import { elementSlice } from './element';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    element: elementSlice.reducer,
    apis: apisSlice.reducer
  },
});