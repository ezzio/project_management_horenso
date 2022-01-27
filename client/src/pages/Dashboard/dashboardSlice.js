import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dashboardApi from 'api/dashboardApi';

const initialState = {
  nameProject: '',
  createAtProject: '',
  loading: false,
  jobs: [],
  tasks: [],
  activity: [],
  tree: [],
};

export const getAllJob = createAsyncThunk(
  'dashboard/get-all-job',
  async (params) => {
    const res = await dashboardApi.getAllJob(params);
    return res;
  }
);

export const getAllTask = createAsyncThunk(
  'dashboard/get-all-task',
  async (params) => {
    const res = await dashboardApi.getAllTask(params);
    return res;
  }
);

export const getTimeLine = createAsyncThunk(
  'dashboard/get-time-line',
  async (params) => {
    const res = await dashboardApi.getTimeLine(params);
    return res;
  }
);

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducer: {},
  extraReducers: {
    [getAllJob.pending]: (state) => {
      state.loading = true;
    },
    [getAllJob.rejected]: (state) => {
      state.loading = false;
    },
    [getAllJob.fulfilled]: (state, action) => {
      state.loading = false;
      state.jobs = action.payload.result;
      state.nameProject = action.payload.infoProject.name;
      state.createAtProject = action.payload.infoProject.createAt
    },
    [getAllTask.pending]: (state) => {
      state.loading = true;
    },
    [getAllTask.rejected]: (state) => {
      state.loading = false;
    },
    [getAllTask.fulfilled]: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    [getTimeLine.pending]: (state) => {
      state.loading = true;
    },
    [getTimeLine.rejected]: (state) => {
      state.loading = false;
    },
    [getTimeLine.fulfilled]: (state, action) => {
      state.loading = false;
      state.activity = action.payload;
    },
  },
});

export default dashboardSlice.reducer;
