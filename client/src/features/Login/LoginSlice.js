import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

const initialState = {
  current: {},
  loading: false,
  error: '',
};

export const getUser = createAsyncThunk(
  'login/getUser',
  async (params, thunkAPI) => {
    const currentUser = await userApi.getUser();
    return currentUser;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: {
    [getUser.pending]: (state) => {
      state.loading = true;
    },
    [getUser.rejected]: (state) => {
      state.loading = false;
      state.error = 'Login unsuccessful';
    },
    [getUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
  },
});

export default loginSlice.reducer;
