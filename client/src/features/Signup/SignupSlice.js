import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import userApi from 'api/userApi';

const initialState = {
  id: '',
  loading: false,
  error: '',
};

export const userSignUp = createAsyncThunk('user/sign-up', async (params) => {
  const response = await userApi.signUp(params);
  return response;
});

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
  extraReducers: {
    [userSignUp.pending]: (state) => {
      state.loading = true;
    },
    [userSignUp.rejected]: (state) => {
      state.loading = false;
      state.error = 'Sign up failed!';
    },
    [userSignUp.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      if (action.payload.data.isSuccess) {
        message.success('Sign up successfully!');
      } else {
        message.error(action.payload.data.error);
      }
    },
  },
});

export default signUpSlice.reducer;
