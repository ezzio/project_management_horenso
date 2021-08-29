import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
=======
import loginReducer from "features/Login/LoginSlice";
import signupReducer from "features/Signup/SignupSlice"

>>>>>>> 35491bb605f7d359c035b4c927d509d16553fe0a
export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer
  },
});
