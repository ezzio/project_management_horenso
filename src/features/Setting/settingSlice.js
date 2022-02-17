import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import settingApi from "api/settingApi";

export const getInfoProjectAsync = createAsyncThunk(
  "teammate/getInfoProject",
  async (idProject, thunkAPI) => {
    const currentData = await settingApi.getInfoProject(idProject);
    return currentData;
  }
);

export const renameProjectAsync = createAsyncThunk(
  "teammate/renameProjectAsync",
  async (params, thunkAPI) => {
    const response = await settingApi.renameProject(params);
    return response;
  }
);

export const transferOwnerShip = createAsyncThunk(
  "teammate/transferOwnerShip",
  async (params, thunkAPI) => {
    const response = await settingApi.transferOwnerShip(params);
    return response;
  }
);

export const deleteProjectAsync = createAsyncThunk(
  "teammate/deleteProjectAsync",
  async (idProject, thunkAPI) => {
    const response = await settingApi.deleteProject(idProject);
    return response;
  }
);

const initialState = {
  projectName: "",
  loading: false,
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    renameProject: (state, action) => {
      state.projectName = action.payload.newProjectName;
    },

    deleteProject: (state, idProject) => {
      console.log("delete project: ", idProject);
    },
  },
  extraReducers: {
    [getInfoProjectAsync.pending]: (state) => {
      state.loading = true;
    },
    [getInfoProjectAsync.rejected]: (state) => {},
    [getInfoProjectAsync.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("infoProjectAsync: ", action.payload);
      state.projectName = action.payload.name ? action.payload.name : "";
    },

    [renameProjectAsync.pending]: (state) => {
      state.loading = true;
    },
    [renameProjectAsync.rejected]: (state) => {},
    [renameProjectAsync.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("rename Project: ", action.payload);
    },

    [transferOwnerShip.pending]: (state) => {
      state.loading = true;
    },
    [transferOwnerShip.rejected]: (state) => {},
    [transferOwnerShip.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("transferOwnerShip Project: ", action.payload);
    },

    [deleteProjectAsync.pending]: (state) => {
      state.loading = true;
    },
    [deleteProjectAsync.rejected]: (state) => {},
    [deleteProjectAsync.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("deleteProjectAsync Project: ", action.payload);
    },
  },
});

export const { deleteProject, renameProject } = settingSlice.actions;
export default settingSlice.reducer;
