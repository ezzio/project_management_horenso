import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "api/userApi";
const initialState = {
  name: "User",
  bio: "User bio",
  display_name: "",
  company: "",
  location: "",
  email: "",
  avatarURL: "https://avatars.githubusercontent.com/u/72656184?v=4",
  projects: [],
  loading: false,
};
export const listUserInfo = createAsyncThunk(
  "user/InfoUser",
  async (thunkAPI) => {
    const infoUser = await userApi.listUserInfo();
    return infoUser;
  }
);

export const userSettingSlice = createSlice({
  name: "userSetting",
  initialState,
  reducers: {
    editProfile: (state, action) => {
      state.name = action.payload.name;
      state.bio = action.payload.bio;
      state.company = action.payload.company;
      state.location = action.payload.location;
      state.email = action.payload.email;
      state.link = action.payload.link;
      state.facebook = action.payload.facebook;
    },
    uploadAvatar: (state, action) => {
      console.log(action.payload);
      state.avatarURL = action.payload;
    },
  },
  extraReducers: {
    [listUserInfo.pending]: (state) => {},
    [listUserInfo.rejected]: (state) => {},
    [listUserInfo.fulfilled]: (state, action) => {
      let payload = action.payload;
      if (payload) {
        let userInfo = payload[0].userInfo;
        state.name = userInfo.user_name;
        state.display_name = userInfo.display_name;
        state.bio = userInfo.bio;
        state.company = userInfo.company;
        state.location = userInfo.location;
        state.email = userInfo.email;
        state.avatarURL = userInfo.avatar;
        payload[1].allProject.forEach((project, index) => {
          state.projects.push({
            ...project,
            totalTask: 140,
            completedTask: 90,
            id: index,
          });
        });
      }
    },
  },
});

export const { editProfile, uploadAvatar } = userSettingSlice.actions;
export default userSettingSlice.reducer;
