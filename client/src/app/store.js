import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
=======
import loginReducer from "features/Login/LoginSlice";

>>>>>>> 35491bb605f7d359c035b4c927d509d16553fe0a
export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
