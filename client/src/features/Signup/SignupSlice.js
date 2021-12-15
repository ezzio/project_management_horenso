import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import userApi from "api/userApi";

const initialState = {
  id: '',
  loadding: false,
  error: '',
  isSuccess: false,
}

export const userSignUp = createAsyncThunk(
  "user/sign-up",
  async (params) => {
    const response = await userApi.signUp(params);
    return response;
  }
)

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: {
    [userSignUp.pending]: (state) => {
      state.loadding = true;
    },
    [userSignUp.rejected]: (state) => {
      state.loadding = true;
      state.error = 'Sign up failed!';
    },
    [userSignUp.fulfilled]: (state) => {
      state.isSuccess = true;
      message.info('Sign up successfully!');
    },
  },
});

export default signUpSlice.reducer