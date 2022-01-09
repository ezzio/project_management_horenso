import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TeammateAPI from "api/teammateApi";

export const ListUser = createAsyncThunk(
  "teammate/ListUser",
  async (params, thunkAPI) => {
    const currentListUser = await TeammateAPI.getAll();
    return currentListUser;
  }
);

export const AddNewTeammate = createAsyncThunk(
  "teammate/AddTeammate",
  async (params) => {
    const current = await TeammateAPI.addTeammate(params);
    return current;
  }
);

export const DeleteTeammateByUsername = createAsyncThunk(
  "teammate/AddTeammate",
  async (username) => {
    const current = await TeammateAPI.deleteTeammate(username);
    return current;
  }
);

export const EditTeammateByUsername = createAsyncThunk(
  "teammate/AddTeammate",
  async (params) => {
    const current = await TeammateAPI.editTeammate(params);
    return current;
  }
);

const initialState = {
  dataList: [],
};

export const teammateSlice = createSlice({
  name: "teammate",
  initialState,
  reducers: {
    addNewTeammate: (state, action) => {
      console.log(action.payload);
      state.dataList.push(action.payload);
    },
    deleteTeammate: (state, action) => {
      console.log(action.payload);
      state.dataList = state.dataList.filter(
        (i) => i.user_name !== action.payload
      );
    },
    editTeammate: (state, action) => {
      const { user_name, newRole } = action.payload;
      const memberChangeIndex = state.dataList.findIndex(
        (item) => item.user_name === user_name
      );

      if (memberChangeIndex >= 0) {
        state.dataList[memberChangeIndex].tag = newRole;
      }
    },
  },
  extraReducers: {
    [ListUser.pending]: (state) => {},
    [ListUser.rejected]: (state) => {},
    [ListUser.fulfilled]: (state, action) => {
      console.log("list user redux: ", action.payload);
      state.dataList = action.payload;
    },

    [AddNewTeammate.pending]: (state) => {},
    [AddNewTeammate.rejected]: (state) => {},
    [AddNewTeammate.fulfilled]: (state, action) => {
      console.log("added teammate: ", action.payload);
    },

    [DeleteTeammateByUsername.pending]: (state) => {},
    [DeleteTeammateByUsername.rejected]: (state) => {},
    [DeleteTeammateByUsername.fulfilled]: (state, action) => {
      console.log("Delete teammate: ", action.payload);
    },

    [EditTeammateByUsername.pending]: (state) => {},
    [EditTeammateByUsername.rejected]: (state) => {},
    [EditTeammateByUsername.fulfilled]: (state, action) => {
      console.log("Edit teammate: ", action.payload);
    },
  },
});

export const { addNewTeammate, deleteTeammate, editTeammate } =
  teammateSlice.actions;
export default teammateSlice.reducer;