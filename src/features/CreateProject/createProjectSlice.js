import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import projectApi from "api/projectApi";
import { addNewProject } from "pages/UserSettings/UserSettingSlice";

const initialState = {
  loading: false,
  idProject: "",
};

export const createProjectAsync = createAsyncThunk(
  "project/create",
  async (params, thunkAPI) => {
    thunkAPI.dispatch(addNewProject(params));
    let res = await projectApi.createNew(params);
    return res;
  }
);

export const createProjectSlice = createSlice({
  name: "createProject",
  initialState,
  reducer: {},
  extraReducers: {
    [createProjectAsync.pending]: (state) => {
      state.loading = true;
    },
    [createProjectAsync.rejected]: (state) => {
      state.loading = false;
      message.error("Something went wrong!");
    },
    [createProjectAsync.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        message.success("Create successful");
        localStorage.setItem("projectowner", action.payload.idProject);
        state.idProject = action.payload.idProject;
      } else {
        message.error("Something went wrong!");
      }
    },
  },
});

export default createProjectSlice.reducer;
