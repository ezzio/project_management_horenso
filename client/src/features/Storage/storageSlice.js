import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import storageAPI from "api/storageApi";
import moment from "moment";

export const listFile = createAsyncThunk(
  "storage/listFile",
  async (params, thunkAPI) => {
    const currentListFile = await storageAPI.getAll(params);
    return {
      currentListFile: currentListFile,
      nameParamValue: params.nameParamValue,
    };
  }
);

export const deleteFileAsync = createAsyncThunk(
  "storage/deleteFile",
  async (params, thunkAPI) => {
    const response = await storageAPI.deleteFile(params);
    return response;
  }
);

const initialState = {
  dataFile: [],
};

export const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    deleteFile: (state, action) => {
      state.dataFile = state.dataFile.filter((item) => {
        return item.name !== action.payload;
      });
    },
  },

  extraReducers: {
    [listFile.pending]: (state) => {},
    [listFile.rejected]: (state) => {},
    [listFile.fulfilled]: (state, action) => {
      // console.log("list file redux: ", action.payload);

      const urlParams = action.payload.nameParamValue
        ? action.payload.nameParamValue
        : "";

      const filterData = action.payload.currentListFile.filter((entry) =>
        entry.name.includes(urlParams)
      );

      filterData.length > 0
        ? (state.dataFile = filterData.map((item, index) => {
            return {
              ...item,
              key: index,
              uploaded_at: moment(item.uploaded_at).format("YYYY-MM-DD"),
            };
          }))
        : (state.dataFile = []);
    },

    [deleteFileAsync.pending]: (state) => {},
    [deleteFileAsync.rejected]: (state) => {},
    [deleteFileAsync.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { deleteFile } = storageSlice.actions;
export default storageSlice.reducer;
