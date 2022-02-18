import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import userApi from 'api/userApi';

const initialState = {
  loading: false,
  error: '',
};

export const signUp = createAsyncThunk('user/register', async (params) => {
  const currentUser = await userApi.signUp(params);
  return currentUser;
});

export const registerSlice = createSlice({
  name: 'sign-up',
  initialState,
  reducers: {},
  extraReducers: {
    [signUp.pending]: (state) => {
      state.loading = true;
    },
    [signUp.rejected]: (state) => {
      state.loading = false;
      message.error('Login failed, please try later');
    },
    [signUp.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload && !action.payload.data.isSuccess) {
        message.error(action.payload.data.error);
      } else {
        message.success('Sign up successfully!');
        localStorage.setItem('access_token', action.payload.data.id);
        setTimeout(() => {
          window.location.replace('/');
        }, 500);
      }
    },
  },
});

export default registerSlice.reducer;
