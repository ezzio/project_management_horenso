import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "api/userApi";
const initialState = {
  name: "User",
  bio: "User bio",
  company: "",
  location: "",
  email: "",
  avatarURL: "https://avatars.githubusercontent.com/u/72656184?v=4",
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
     
        state.name = action.payload.userInfo.display_name,
        state.bio = payload.userInfo.bio,
        state.company = payload.company,
        state.location = payload.location,
        state.email = payload.email,
        state.avatarURL = payload.avatarURL
      
    },
  },
});

export const { editProfile, uploadAvatar } = userSettingSlice.actions;
export default userSettingSlice.reducer;
