import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import detailTaskApi from "api/deilTask";

const initialDetailTask = {
  loadding: false,
  allDetailTask: [],
};

export const listAllDetailTaskAsync = createAsyncThunk(
  "detailTask/ListDetailTask",
  async (params, thunkAPI) => {
    let allDetailTask = await detailTaskApi.listAllDetailTask(params);
    return allDetailTask;
  }
);
export const createADetailTaskAsync = createAsyncThunk(
  "detailTask/CreateDetailTask",
  async (params, thunkAPI) => {
    let createADetailTask = await detailTaskApi.createADetailTask(params);
    thunkAPI.dispatch(
      detailTask.addADetailTask({
        name: params.name,
        assignOn: moment().format("DD/MM/YYYY"),
        isCompleted: false,
      })
    );
    return createADetailTask;
  }
);

const detailTask = createSlice({
  name: "detailTask",
  initialState: initialDetailTask,
  reducers: {
    addADetailTask: (state, action) => {
      console.log(action.payload);
      state.allDetailTask.push(action.payload);
    },
  },
  extraReducers: {
    [listAllDetailTaskAsync.pending]: (state) => {
      state.loading = false;
    },
    [listAllDetailTaskAsync.rejected]: (state) => {
      state.loading = true;
    },
    [listAllDetailTaskAsync.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.allDetailTask = action.payload.infoAllDetailTask;
      }
    },
    [createADetailTaskAsync.pending]: (state) => {},
    [createADetailTaskAsync.rejected]: (state) => {},
    [createADetailTaskAsync.fulfilled]: (state, action) => {
      console.log(action.payload);
      // if(action.payload){

      // }
    },
  },
});

export default detailTask.reducer;
