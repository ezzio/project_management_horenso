import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import projectApi from 'api/projectApi';
import { addNewProject } from 'pages/UserSettings/UserSettingSlice';

const initialState = {
  loading: false,
  isSuccess: false,
};

export const createProjectAsync = createAsyncThunk(
  'project/create',
  async (params, thunkAPI) => {
    // thunkAPI.dispatch(addNewProject(params));

    const temp = await projectApi.createNew(params);
    return temp;
  }
);

export const createProjectSlice = createSlice({
  name: 'createProject',
  initialState,
  reducer: {},
  extraReducers: {
    [createProjectAsync.pending]: (state) => {
      state.loading = true;
    },
    [createProjectAsync.rejected]: (state) => {
      state.loading = false;
      message.error('Something went wrong!');
    },
    [createProjectAsync.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
    },
  },
});

export default createProjectSlice.reducer;
