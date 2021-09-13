import { configureStore } from '@reduxjs/toolkit';
import loginReducer from 'features/Login/LoginSlice';
import signupReducer from 'features/Signup/SignupSlice';
export const store = configureStore({
  reducer: {
    board: boardReducer,
    login: loginReducer,
    signup: signupReducer,
  },
});
