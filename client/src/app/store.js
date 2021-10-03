import { configureStore } from '@reduxjs/toolkit';
import loginReducer from 'features/Login/LoginSlice';
import signupReducer from 'features/Signup/SignupSlice';
import boardReducer from 'features/Board/boardSlice';
import timelineReducer from 'features/ReportTimeline/TimelineSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    login: loginReducer,
    signup: signupReducer,
    timeline: timelineReducer,
  },
});
