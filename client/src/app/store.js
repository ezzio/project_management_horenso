import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "features/Login/LoginSlice";
import signupReducer from "features/Signup/SignupSlice";
import boardReducer from "features/Board/boardSlice";
import timelineReducer from "features/ReportTimeline/TimelineSlice";
import kanbanReducer from "features/KanbanDashBoard/KanbanDashBoardSlice";
import userSettingReducer from "pages/UserSettings/UserSettingSlice";
import teammateReducer from "features/Teammate/teammateSlice";
import createProjectReducer from "features/CreateProject/createProjectSlice";
import detailTaskReducer from "features/DetailTask/DetailTaskSlice";
import storageReducer from "features/Storage/storageSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    login: loginReducer,
    signup: signupReducer,
    timeline: timelineReducer,
    kanban: kanbanReducer,
    userSetting: userSettingReducer,
    teammate: teammateReducer,
    createProject: createProjectReducer,
    detailTask: detailTaskReducer,
    storage: storageReducer,
  },
});
