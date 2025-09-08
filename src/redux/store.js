// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication/authenticationSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export default store;
