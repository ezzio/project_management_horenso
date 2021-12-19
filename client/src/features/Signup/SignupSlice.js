import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import userApi from "api/userApi";

const initialState = {
  id: "",
  loadding: false,
  error: "",
};

export const userSignUp = createAsyncThunk("user/sign-up", async (params) => {
  const response = await userApi.signUp(params);
  return response;
});

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
      state.error = "Sign up failed!";
    },
    [userSignUp.fulfilled]: (state, action) => {
      console.log(action.payload);
      //   if (action.payload.isSuccess) {
      //     message.info("Sign up successfully!");
      //     state.loadding = true;
      //   } else {
      //     message.info("Sign up failed!");
      //   }
    },
  },
});

export default signUpSlice.reducer;
