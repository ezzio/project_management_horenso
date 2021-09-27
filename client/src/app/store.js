import { configureStore } from '@reduxjs/toolkit';
import loginReducer from 'features/Login/LoginSlice';
import signupReducer from 'features/Signup/SignupSlice';
import boardReducer from 'features/Board/boardSlice';
import tagReducer from 'features/TagReport/TagSlice';
import timelineReducer from 'features/Report - Timeline/TimelineSlice';
export const store = configureStore({
  reducer: {
    board: boardReducer,
    login: loginReducer,
    signup: signupReducer,
    tags: tagReducer,
    timelines: timelineReducer,
  },
});
