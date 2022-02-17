import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import userApi from 'api/userApi';

const initialState = {
  id: '',
  isLogin: false,
  loading: false,
  error: '',
};

export const userLogin = createAsyncThunk('user/login', async (params) => {
  const currentUser = await userApi.login(params);
  return currentUser;
});

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
    },
    [userLogin.rejected]: (state) => {
      state.loading = false;
      message.error('Login failed, please try later');
    },
    [userLogin.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      if (action.payload?.isSuccess) {
        message.success('Login successfully!');
        localStorage.setItem('access_token', action.payload.id);
        window.location.replace('/');
      }
    },
  },
});

export default loginSlice.reducer;
