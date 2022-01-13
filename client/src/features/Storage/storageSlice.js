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
      // const urlParams = action.payload.nameParamValue
      //   ? action.payload.nameParamValue
      //   : "";

      const urlParams = action.payload.nameParamValue;

      const filterData = action.payload.currentListFile.filter((entry) =>
        entry.name.includes(urlParams)
      );

      // urlParams.length !== 0
      filterData.length > 0
        ? (state.dataFile = filterData.map((item, index) => {
            return {
              ...item,
              key: index,
              uploaded_at: moment(item.uploaded_at).format("YYYY-MM-DD"),
            };
          }))
        : (state.dataFile = action.payload.currentListFile.map(
            (item, index) => {
              return {
                ...item,
                key: index,
                uploaded_at: moment(item.uploaded_at).format("YYYY-MM-DD"),
              };
            }
          ));
    },
  },
});

// export const {} = teammateSlice.actions;
export default storageSlice.reducer;
