import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dashboardApi from 'api/dashboardApi';
import projectApi from 'api/projectApi';

const initialState = {
  nameProject: '',
  createAtProject: '',
  loading: false,
  jobs: [],
  tasks: [],
  activity: [],
  linePlot: [],
  numberOfFetch: 0,
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

export const getLinePlot = createAsyncThunk(
  'dashboard/get-line-plot',
  async (params) => {
    const res = await dashboardApi.getLinePlot(params);
    return res;
  }
);

export const updateProgressProject = createAsyncThunk(
  'dashboard/update-progress-project',
  async (params) => {
    const res = await projectApi.updateProgress(params);
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
      state.jobs = action.payload.result;
      state.nameProject = action.payload.infoProject.name;
      state.createAtProject = action.payload.infoProject.createAt;

      state.numberOfFetch += 1;
    },
    [getAllTask.pending]: (state) => {
      state.loading = true;
    },
    [getAllTask.rejected]: (state) => {
      state.loading = false;
    },
    [getAllTask.fulfilled]: (state, action) => {
      state.tasks = action.payload;
      state.numberOfFetch += 1;
    },
    [getTimeLine.pending]: (state) => {
      state.loading = true;
    },
    [getTimeLine.rejected]: (state) => {
      state.loading = false;
    },
    [getTimeLine.fulfilled]: (state, action) => {
      state.activity = action.payload;
      state.numberOfFetch += 1;
    },
    [getLinePlot.pending]: (state) => {
      state.loading = true;
    },
    [getLinePlot.rejected]: (state) => {
      state.loading = false;
    },
    [getLinePlot.fulfilled]: (state, action) => {
      state.loading = false;
      state.linePlot = action.payload;
      state.numberOfFetch = 0;
    },
  },
});

export default dashboardSlice.reducer;
