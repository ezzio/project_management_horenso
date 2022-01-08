import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { boardApi } from 'api/boardApi';
import moment from 'moment';

const initialState = {
  loading: false,
  listTask: [
    {
      id_column: 0,
      eachColumnTask: [],
    },
    {
      id_column: 1,
      eachColumnTask: [],
    },
    {
      id_column: 2,
      eachColumnTask: [],
    },
    {
      id_column: 3,
      eachColumnTask: [],
    },
  ],
  memberInJob: [],
};

export const fetchBoard = createAsyncThunk('board/fetch', async (params) => {
  let res = await boardApi.fetch(params);
  return res;
});

export const addTask = createAsyncThunk(
  'board/add-task',
  async (params, thunkAPI) => {
    let res = await boardApi.addTask(params);
    // thunkAPI.dispatch(addNewTask(params));
    return res;
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      state.columns[0].tasks.push(action.payload);
    },

    deleteTask: (state, action) => {
      const { deleteTaskId, columnId } = action.payload;
      state.columns[columnId].tasks = state.columns[columnId].tasks.filter(
        (task) => task.id !== deleteTaskId
      );
    },

    updateTask: (state, action) => {
      // console.log(action.payload);
      const { editTask, columnId } = action.payload;
      // console.log(editTask.id, columnId);
      const taskIndex = state.columns[columnId].tasks.findIndex(
        (task) => task.id === editTask.id
      );

      if (taskIndex >= 0) {
        state.columns[columnId].tasks[taskIndex] = editTask;
      }
    },
    // automaticChangeStatusTask: (state) => {
    //   let currentTask;
    //   if (state.columns[0].tasks)
    //     state.columns[0].tasks.map((task, index) => {
    //       if (moment().isBetween(task.startTime, task.endTime)) {
    //         currentTask = task;
    //         state.columns[1].tasks.push(currentTask);
    //         state.columns[0].tasks.splice(index, 1);
    //       }
    //       if (moment().isAfter(task.endTime)) {
    //         task.isOverdue = true;
    //       } else {
    //         task.isOverdue = false;
    //       }
    //     });
    //   if (state.columns[1].tasks)
    //     state.columns[1].tasks.map((task, index) => {
    //       if (task.progress === '100') {
    //         currentTask = task;
    //         state.columns[2].tasks.push(currentTask);
    //         state.columns[1].tasks.splice(index, 1);
    //       } else if (moment().isAfter(task.endTime)) {
    //         task.isOverdue = true;
    //       } else {
    //         task.isOverdue = false;
    //       }
    //       if (!moment().isBetween(task.startTime, task.endTime)) {
    //         currentTask = task;
    //         state.columns[0].tasks.push(currentTask);
    //         state.columns[1].tasks.splice(index, 1);
    //       }
    //     });
    //   if (state.columns[2].tasks)
    //     state.columns[2].tasks.map((task, index) => {
    //       if (task.is_completed) {
    //         currentTask = task;
    //         state.columns[3].tasks.push(currentTask);
    //         state.columns[2].tasks.splice(index, 1);
    //       }
    //     });
    // },
  },
  extraReducers: {
    [fetchBoard.pending]: (state) => {
      state.loading = true;
    },
    [fetchBoard.rejected]: (state) => {
      state.loading = false;
    },
    [fetchBoard.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        console.log(action.payload.ListTask);
        state.listTask = action.payload.ListTask;
        state.memberInJob = action.payload.memberInJob;
      }
    },
    [addTask.pending]: (state) => {
      state.loading = true;
    },
    [addTask.rejected]: (state) => {
      state.loading = false;
    },
    [addTask.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        console.log(action.payload);
        message.success('Success! Task has been created.');
      }
    },
  },
});

export const { deleteTask, updateTask, automaticChangeStatusTask, addNewTask } =
  boardSlice.actions;
export default boardSlice.reducer;
