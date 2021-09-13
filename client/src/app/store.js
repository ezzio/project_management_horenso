import { configureStore } from '@reduxjs/toolkit';
import loginReducer from 'features/Login/LoginSlice';
import signupReducer from 'features/Signup/SignupSlice';
import boardReducer from 'features/Board/boardSlice';
export const store = configureStore({
  reducer: {
    board: boardReducer,
    login: loginReducer,
    signup: signupReducer,
  },
});
