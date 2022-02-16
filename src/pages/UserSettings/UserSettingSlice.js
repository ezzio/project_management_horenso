import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
const initialState = {
  name: '',
  bio: '',
  display_name: '',
  company: '',
  location: '',
  email: '',
  avatarURL: '',
  projects: [
    {
      idProject: 1,
      title: '',
      members: [''],
    },
  ],
  loading: false,
  tasks: [],
  allTask: [],
};
export const listUserInfo = createAsyncThunk(
  'user/InfoUser',
  async (thunkAPI) => {
    const infoUser = await userApi.listUserInfo();
    return infoUser;
  }
);
export const editUserAsync = createAsyncThunk(
  'user/editUser',
  async (params, thunkAPI) => {
    thunkAPI.dispatch(editProfile(params));
    const infoUser = await userApi.editUser(params);
    return infoUser;
  }
);

export const userSettingSlice = createSlice({
  name: 'userSetting',
  initialState,
  reducers: {
    editProfile: (state, action) => {
      state.display_name = action.payload.display_name;
      state.bio = action.payload.bio;
      state.company = action.payload.company;
      state.location = action.payload.location;
      state.email = action.payload.email;
    },
    uploadAvatar: (state, action) => {
      state.avatarURL = action.payload;
    },
    addNewProject: (state, action) => {
      const newProject = {
        title: action.payload.name,
        member: [
          {
            avatar: current(state).avatarURL,
          },
        ],
        totalTask: 140,
        completedTask: 90,
        id: current(state).projects.length,
      };
      state.projects.push(newProject);
    },
  },
  extraReducers: {
    [listUserInfo.pending]: (state) => {
      state.loading = true;
    },
    [listUserInfo.rejected]: (state) => {
      state.loading = false;
    },
    [listUserInfo.fulfilled]: (state, action) => {
      let payload = action.payload;
      state.loading = false;

      if (payload) {
        let userInfo = payload[0].userInfo;
        state.name = userInfo.user_name;
        state.display_name = userInfo.display_name;
        state.bio = userInfo.bio;
        state.company = userInfo.company;
        state.location = userInfo.address;
        state.email = userInfo.email;
        state.avatarURL = userInfo.avatar;
        state.projects = [];
        payload[1].allProject.forEach((project, index) => {
          state.projects.push({
            ...project,
            totalTask: project.totalTaskInProject,
            completedTask: project.totalTaskComplete,
          });
        });
        state.allTask = payload[1].allTask;
      }
    },
    [editUserAsync.pending]: (state, action) => {},
    [editUserAsync.pending]: (state, action) => {},
    [editUserAsync.pending]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { editProfile, uploadAvatar, addNewProject } =
  userSettingSlice.actions;
export default userSettingSlice.reducer;
