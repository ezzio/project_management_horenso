import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import storageAPI from "api/storageApi";
import moment from "moment";

export const listFile = createAsyncThunk(
  "storage/listFile",
  async (idproject, thunkAPI) => {
    const currentListFile = await storageAPI.getAll(idproject);
    return currentListFile;
  }
);

const initialState = {
  dataFile: [],
};

export const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {},
  extraReducers: {
    [listFile.pending]: (state) => {},
    [listFile.rejected]: (state) => {},
    [listFile.fulfilled]: (state, action) => {
      console.log("list file redux: ", action.payload);
      state.dataFile = action.payload.map((item, index) => {
        return {
          ...item,
          key: index,
          uploaded_at: moment(item.uploaded_at).format("YYYY-MM-DD"),
        };
      });
    },
  },
});

// export const {} = teammateSlice.actions;
export default storageSlice.reducer;
