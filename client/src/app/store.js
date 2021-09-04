import { configureStore } from "@reduxjs/toolkit";
import loginReducer from 'features/Login/LoginSlice';
import signupReducer from 'features/Signup/SignupSlice';
import tagReducer from 'features/Tag - Report/TagSlice'

const rootReducer = {
  login: loginReducer,
  signup: signupReducer,
  tags: tagReducer,
}

export const store = configureStore({
  reducer: rootReducer,
});
