import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import TeammateAPI from "api/teammateApi";

export const ListUser = createAsyncThunk(
  "teammate/ListUser",
  async (projectId, thunkAPI) => {
    const currentListUser = await TeammateAPI.getAll(projectId);
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
  "teammate/DeleteTeammateByUsername",
  async (params) => {
    const current = await TeammateAPI.deleteTeammate(params);
    return current;
  }
);

export const EditTeammateByUsername = createAsyncThunk(
  "teammate/EditTeammateByUsername",
  async (params) => {
    const current = await TeammateAPI.editTeammate(params);
    return current;
  }
);

const initialState = {
  dataList: [],
  isProjectOwner: false,
  loading: false,
};

export const teammateSlice = createSlice({
  name: "teammate",
  initialState,
  reducers: {
    addNewTeammate: (state, action) => {
      // console.log(action.payload);
      const newTeammate = {
        user_name: action.payload.user_name,
        avatar: action.payload.avatar,
        tag: action.payload.tag,
      };
      state.dataList.push(newTeammate);
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
    [ListUser.pending]: (state) => {
      state.loading = true;
    },
    [ListUser.rejected]: (state) => {},
    [ListUser.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("list user redux: ", action.payload);
      state.dataList = action.payload.listMembersResult;
      state.isProjectOwner = action.payload.isProjectOwner;
    },

    [AddNewTeammate.pending]: (state) => {
      state.loading = true;
    },
    [AddNewTeammate.rejected]: (state) => {},
    [AddNewTeammate.fulfilled]: (state, action) => {
      // console.log("added teammate: ", action.payload);
      state.loading = false;
    },

    [DeleteTeammateByUsername.pending]: (state) => {
      state.loading = true;
    },
    [DeleteTeammateByUsername.rejected]: (state) => {},
    [DeleteTeammateByUsername.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("Delete teammate: ", action.payload);
    },

    [EditTeammateByUsername.pending]: (state) => {
      state.loading = true;
    },
    [EditTeammateByUsername.rejected]: (state) => {},
    [EditTeammateByUsername.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("Edit teammate: ", action.payload);
    },
  },
});

export const { addNewTeammate, deleteTeammate, editTeammate } =
  teammateSlice.actions;
export default teammateSlice.reducer;
