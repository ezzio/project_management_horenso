import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import detailTaskApi from 'api/deilTask';
import { message } from 'antd';

const initialDetailTask = {
  loading: false,
  allDetailTask: [],
};

export const listAllDetailTaskAsync = createAsyncThunk(
  'detailTask/ListDetailTask',
  async (params, thunkAPI) => {
    let allDetailTask = await detailTaskApi.listAllDetailTask(params);
    return allDetailTask;
  }
);
export const createADetailTaskAsync = createAsyncThunk(
  'detailTask/CreateDetailTask',
  async (params, thunkAPI) => {
    thunkAPI.dispatch(
      addADetailTask({
        name: params.name,
        assignOn: moment().format('DD/MM/YYYY'),
        isCompleted: false,
      })
    );

    let createADetailTask = await detailTaskApi.createADetailTask(params);
    return createADetailTask;
  }
);

const detailTask = createSlice({
  name: 'detailTask',
  initialState: initialDetailTask,
  reducers: {
    addADetailTask: (state, action) => {
      console.log(action.payload);
      state.allDetailTask.push(action.payload);
    },
  },
  extraReducers: {
    [listAllDetailTaskAsync.pending]: (state) => {
      state.loading = true;
    },
    [listAllDetailTaskAsync.rejected]: (state) => {
      state.loading = false;
    },
    [listAllDetailTaskAsync.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.allDetailTask = action.payload.infoAllDetailTask.map(
          (task, index) => {
            return {
              ...task,
              key: index,
              assignOn: moment(task.assignOn).format('YYYY-MM-DD'),
            };
          }
        );
      }
    },
    [createADetailTaskAsync.pending]: (state) => {
      state.loading = true;
    },
    [createADetailTaskAsync.rejected]: (state) => {
      state.loading = false;
    },
    [createADetailTaskAsync.fulfilled]: (state, action) => {
      state.loading = false;

      if (action.payload) message.success('Create successful');
    },
  },
});

export default detailTask.reducer;
export const { addADetailTask } = detailTask.actions;
