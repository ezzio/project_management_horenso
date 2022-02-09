import { configureStore } from '@reduxjs/toolkit';
import loginReducer from 'features/Login/LoginSlice';
import signupReducer from 'features/SignUp/signUpSlice';
import boardReducer from 'features/Board/boardSlice';
import timelineReducer from 'features/ReportTimeline/TimelineSlice';
import kanbanReducer from 'features/KanbanDashBoard/KanbanDashBoardSlice';
import userSettingReducer from 'pages/UserSettings/UserSettingSlice';
import teammateReducer from 'features/Teammate/teammateSlice';
import createProjectReducer from 'features/CreateProject/createProjectSlice';
import detailTaskReducer from 'features/DetailTask/DetailTaskSlice';
import createChannelReducer from 'features/ListChannel/ListChannelSlice';
import storageReducer from 'features/Storage/storageSlice';
import chatOnTaskReducer from 'features/ChatOnTask/chatOnTaskSlice';
import chatBoxReducer from 'features/ChatBox/ChatBoxSlice';
import settingReducer from 'features/Setting/settingSlice';
import meetingRoomReducer from 'features/MRoom/meetingRoomSlice';
import dashboardReducer from 'pages/Dashboard/dashboardSlice';
import signUpReducer from 'features/SignUp/signUpSlice';
export const store = configureStore({
  reducer: {
    board: boardReducer,
    login: loginReducer,
    signup: signUpReducer,
    timeline: timelineReducer,
    kanban: kanbanReducer,
    userSetting: userSettingReducer,
    teammate: teammateReducer,
    createProject: createProjectReducer,
    detailTask: detailTaskReducer,
    createChannel: createChannelReducer,
    storage: storageReducer,
    chatOnTask: chatOnTaskReducer,
    chatBox: chatBoxReducer,
    setting: settingReducer,
    roomMeeting: meetingRoomReducer,
    dashboard: dashboardReducer,
  },
});
