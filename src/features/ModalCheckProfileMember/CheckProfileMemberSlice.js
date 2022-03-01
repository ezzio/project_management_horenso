import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

const initialState = {
  user_name: '',
  displayName: '',
  avatarURL: '',
  bio: '',
  email: '',
  company: '',
  address: '',
  projectOwner: [],
  loading: false,
};

export const viewMemberInfo = createAsyncThunk(
  '/user/getInfoUser',
  async (params, thunkAPI) => {
    const memberInfo = await userApi.checkProfileMember(params);
    return memberInfo;
  }
);

export const CheckProfileMember = createSlice({
  name: 'checkProfileMember',
  initialState,
  reducers: {},
  extraReducers: {
    [viewMemberInfo.pending]: (state) => {
      state.loading = true;
    },
    [viewMemberInfo.rejected]: (state) => {
      state.loading = false;
    },
    [viewMemberInfo.fulfilled]: (state, action) => {
      state.loading = false;
      const payload = action.payload;
      if (payload) {
        let memberInfo = payload[0].userInfo;
        state.user_name = memberInfo.username;
        state.displayName = memberInfo.displayName;
        state.avatarURL = memberInfo.avatarURL;
        state.bio = memberInfo.bio;
        state.email = memberInfo.email;
        state.company = memberInfo.company;
        state.address = memberInfo.address;
        state.projectOwner = [];
        payload[1].projectOwner.forEach((item) => {
          state.projectOwner.push({
            title: item.title,
            progress: item.progress,
          });
        });
      }
    },
  },
});

export default CheckProfileMember.reducer;
