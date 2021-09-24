import { configureStore } from '@reduxjs/toolkit';
import loginReducer from 'features/Login/LoginSlice';
import signupReducer from 'features/Signup/SignupSlice';
import boardReducer from 'pages/Kanban/Board/boardSlice';
import tagReducer from 'features/Tag - Report/TagSlice';
export const store = configureStore({
  reducer: {
    board: boardReducer,
    login: loginReducer,
    signup: signupReducer,
    tags: tagReducer,
  },
});
