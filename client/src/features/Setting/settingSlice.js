import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    renameProject: (state, action) => {
      console.log("rename project: ", action.payload);
    },

    deleteProject: (state, idProject) => {
      console.log("delete project: ", idProject);
    },
  },
  extraReducers: {},
});

export const { deleteProject, renameProject } = settingSlice.actions;
export default settingSlice.reducer;
