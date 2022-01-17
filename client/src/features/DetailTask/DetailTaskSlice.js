import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import detailTaskApi from "api/detailTask";
import { message } from "antd";

const initialDetailTask = {
  loading: false,
  isUploadFileSuccess: false,
  allDetailTask: [],
  infoTask: {},
};

export const listAllDetailTaskAsync = createAsyncThunk(
  "detailTask/ListDetailTask",
  async (params) => {
    let allDetailTask = await detailTaskApi.listAllDetailTask(params);
    return allDetailTask;
  }
);
export const createADetailTaskAsync = createAsyncThunk(
  "detailTask/CreateDetailTask",
  async (params, thunkAPI) => {
    thunkAPI.dispatch(
      addADetailTask({
        name: params.name,
        assignOn: moment().format("YYYY-MM-DD"),
        isCompleted: false,
      })
    );

    let createADetailTask = await detailTaskApi.createADetailTask(params);
    return createADetailTask;
  }
);
export const editDetailTaskAsync = createAsyncThunk(
  "detailTask/edit-detail-task",
  async (params, thunkAPI) => {
    thunkAPI.dispatch(editDetailTask(params));
    const res = await detailTaskApi.editDetailTask(params);
    return res;
  }
);

export const deleteDetailTaskAsync = createAsyncThunk(
  "detailTask/delete-detail-task",
  async (params, thunkAPI) => {
    thunkAPI.dispatch(deleteDetailTask(params));
    const res = await detailTaskApi.deleteDetailTask(params);
    return res;
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
    editDetailTask: (state, action) => {
      const idx = state.allDetailTask.findIndex((task) => {
        return action.payload.idDetailTask === task.id;
      });
      const temp = {
        ...state.allDetailTask[idx],
        name: action.payload.name,
      };
      state.allDetailTask.splice(idx, 1, temp);
    },
    deleteDetailTask: (state, action) => {
      const idx = state.allDetailTask.findIndex((task) => {
        return action.payload.idDetailTask === task.id;
      });

      state.allDetailTask.splice(idx, 1);
    },

    uploadFile: (state, action) => {
      // console.log("payload uploadFileAsync: ", action.payload);
      const data = {
        idAttachment: action.payload.newAttachment.idAttachment,
        name: action.payload.newAttachment.name,
        nameType: action.payload.newAttachment.nameType,
        upload_at: moment(action.payload.newAttachment.upload_at).format(
          "YYYY-MM-DD"
        ),
      };
      const idDetailTask = action.payload.idDetailTask;
      const index = state.allDetailTask.findIndex(
        (item) => item.id === idDetailTask
      );

      if (action.payload && action.payload.isSuccess) {
        state.allDetailTask[index].attachmentsOfDetailTask.push(data);
      }
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
        state.allDetailTask = action.payload.infoAllDetailTask.map((task) => {
          return {
            ...task,
            key: task.id,
            assignOn: moment(task.assignOn).format("YYYY-MM-DD"),
          };
        });
        state.infoTask = {
          ...action.payload.infoTask,
          start_time: moment(action.payload.infoTask.start_time).format(
            "YYYY-MM-DD"
          ),
          end_time: moment(action.payload.infoTask.end_time).format(
            "YYYY-MM-DD"
          ),
        };
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

      if (action.payload) message.success("Create successful");
    },
  },
});

export default detailTask.reducer;
export const { addADetailTask, editDetailTask, deleteDetailTask, uploadFile } =
  detailTask.actions;
