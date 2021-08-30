import { configureStore } from '@reduxjs/toolkit';
import loginReducer from 'features/Login/LoginSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
