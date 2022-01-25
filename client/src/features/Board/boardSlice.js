import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { boardApi } from 'api/boardApi';
import moment from 'moment';

const initialState = {
  loading: false,
  loadingCompleted: false,
  changeColumnDone: false,
  jobInfo: {},
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

export const fetchBoard = createAsyncThunk(
  'board/fetch',
  async (params, thunkAPI) => {
    let res = await boardApi.fetch(params);
    return res;
  }
);

export const addTask = createAsyncThunk(
  'board/add-task',
  async (params, thunkAPI) => {
    let res = await boardApi.addTask(params);
    thunkAPI.dispatch(addNewTask(res.infoTask));
    return res;
  }
);

export const editTaskAsync = createAsyncThunk(
  'board/edit-task',
  async (params, thunkAPI) => {
    thunkAPI.dispatch(updateTask(params));
    let res = await boardApi.editTask(params.editTask);
    return res;
  }
);

export const deleteTaskAsync = createAsyncThunk(
  'board/delete-task',
  async (params, thunkAPI) => {
    thunkAPI.dispatch(deleteTask(params));
    let res = await boardApi.deleteTask(params);
    return res;
  }
);

export const automateChangeColAsync = createAsyncThunk(
  'board/auto-change-col',
  async (params) => {
    let res = await boardApi.autoChangeColumn(params);
    return res;
  }
);

export const checkCompleted = createAsyncThunk(
  'board/check-finished',
  async (params) => {
    let res = await boardApi.checkCompleted(params);
    return res;
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      const tempTask = {
        id: action.payload.idTask,
        title: action.payload.title,
        is_complete: action.payload.is_complete,
        description: action.payload.description,
        isOverdue: action.payload.isOverdue,
        progress: 0,
        priority: action.payload.priority,
        start_time: moment(action.payload.start_time).format('YYYY-MM-DD'),
        end_time: moment(action.payload.end_time).format('YYYY-MM-DD'),
        taskers: action.payload.infoTaskers,
        totalConversation: 0,
        totalDetilTask: 0,
      };
      state.listTask[0].eachColumnTask.push(tempTask);

      state.changeColumnDone = true;
    },

    deleteTask: (state, action) => {
      const { id, columnId } = action.payload;
      const temp = state.listTask[columnId].eachColumnTask.filter(
        (task) => task.id !== id
      );
      state.listTask[columnId].eachColumnTask = temp;

      state.changeColumnDone = true;
    },

    updateTask: (state, action) => {
      const { editTask, columnId } = action.payload;
      const taskIndex = state.listTask[columnId].eachColumnTask.findIndex(
        (task) => task.id === editTask.taskId
      );
      const temp = {
        id: editTask.taskId,
        description: editTask.description,
        end_time: editTask.end_time,
        start_time: editTask.start_time,
        priority: editTask.priority,
        progress: state.listTask[columnId].eachColumnTask[taskIndex].progress,
        title: editTask.title,
        taskers: editTask.taskers,
        isOverdue: state.listTask[columnId].eachColumnTask[taskIndex].isOverdue,
        is_complete:
          state.listTask[columnId].eachColumnTask[taskIndex].is_complete,
      };

      if (
        columnId !== 0 &&
        !moment().isBetween(
          moment(editTask.start_time),
          moment(editTask.end_time)
        ) &&
        moment().isBefore(editTask.end_time)
      ) {
        state.listTask[0].eachColumnTask.push(temp);
        state.listTask[columnId].eachColumnTask.splice(taskIndex, 1);
      } else state.listTask[columnId].eachColumnTask[taskIndex] = temp;

      state.changeColumnDone = true;
    },
    setChangeColumnDone: (state, action) => {
      state.changeColumnDone = action.payload;
    },
    automaticallyUpdateColumn: (state, action) => {
      const { columnId, task, index } = action.payload;
      if (task.is_complete) return;

      if (task.progress === 100) {
        const indexTaskNeedChangePreview = state.listTask[
          columnId
        ].eachColumnTask.findIndex(
          (item) => item.progress === 100 && item.is_complete === false
        );
        state.listTask[2].eachColumnTask.push(task);
        state.listTask[columnId].eachColumnTask.splice(
          indexTaskNeedChangePreview,
          1
        );
      } else if (
        columnId === 0 &&
        moment().isBetween(
          moment(task.start_time).format('YYYY-MM-DD'),
          moment(task.end_time).format('YYYY-MM-DD')
        )
      ) {
        // change in progress
        state.listTask[0].eachColumnTask.splice(index, 1);
        state.listTask[1].eachColumnTask.push(task);
      } else if (moment().isAfter(task.end_time)) {
        // change overdue
        if (columnId !== 3 && state.listTask[columnId].eachColumnTask[index]) {
          state.listTask[columnId].eachColumnTask[index].isOverdue = true;
        }
        switch (columnId) {
          case 1: {
            state.listTask[0].eachColumnTask.push(
              ...state.listTask[1].eachColumnTask.filter((item) => {
                return item.id === task.id;
              })
            );
            state.listTask[1].eachColumnTask =
              state.listTask[1].eachColumnTask.filter((item) => {
                return item.id !== task.id;
              });

            break;
          }
          case 2: {
            state.listTask[0].eachColumnTask.push(
              ...state.listTask[2].eachColumnTask.filter((item) => {
                return item.id === task.id;
              })
            );
            state.listTask[2].eachColumnTask =
              state.listTask[2].eachColumnTask.filter((item) => {
                return item.id !== task.id;
              });
            break;
          }
          default:
            break;
        }
      }
      state.changeColumnDone = true;
    },
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
        state.jobInfo = action.payload.jobInfo;
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
        message.success('Success! Task has been created.');
      }
    },
    [editTaskAsync.pending]: (state) => {
      state.loading = true;
    },
    [editTaskAsync.rejected]: (state) => {
      state.loading = false;
    },
    [editTaskAsync.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        message.success('Success! Task has been updated.');
      }
    },
    [deleteTaskAsync.pending]: (state) => {
      state.loading = true;
    },
    [deleteTaskAsync.rejected]: (state) => {
      state.loading = false;
    },
    [deleteTaskAsync.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        message.success('Success! Task has been deleted.');
      }
    },
    [checkCompleted.pending]: (state) => {
      state.loadingCompleted = true;
    },
    [checkCompleted.rejected]: (state) => {
      state.loadingCompleted = false;
    },
    [checkCompleted.fulfilled]: (state, action) => {
      state.loadingCompleted = false;
    },
  },
});

export const {
  deleteTask,
  updateTask,
  addNewTask,
  setChangeColumnDone,
  automaticallyUpdateColumn,
} = boardSlice.actions;
export default boardSlice.reducer;
