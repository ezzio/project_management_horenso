import KanbanAPI from "api/kanbanApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
export const ListKanban = createAsyncThunk(
  "Kanan/ListKanban",
  async (params, thunkAPI) => {
    const currentListKanban = await KanbanAPI.ListKanbanOfJob();
    return currentListKanban;
  }
);
export const AddNewJobkanban = createAsyncThunk(
  "Kanan/CreateAKanban",
  async (params) => {
    const current = await KanbanAPI.AddNewJob(params);
    return current;
  }
);
export const DeleteAJob = createAsyncThunk(
  "Kanan/deleteJob",
  async (params) => {
    // console.log(params);
    const current = await KanbanAPI.deleteJob(params);
    return current;
  }
);
export const EditAJob = createAsyncThunk(
  "Kanan/editJob",
  async (params) => {
    // console.log(params);
    const current = await KanbanAPI.editJob(params);
    return current;
  }
);

const initalKanbans = [];

const kanban = createSlice({
  name: "kanbans",
  initialState: initalKanbans,
  reducers: {
    addKanban: (state, action) => {
      state.push(action.payload);
    },
    deleteKanban: (state, action) => {
      console.log(action.payload);
      const deleteKanbanID = action.payload;
      return state.filter((kanban) => kanban.id_job !== deleteKanbanID);
    },
    updateKanban: (state, action) => {
      const editedKanban = action.payload;
      const kanbanIndex = state.findIndex(
        (kanban) => kanban.id_job === editedKanban.id_job
      );
      if (kanbanIndex >= 0) {
        state.splice(kanbanIndex, 1, editedKanban);
      }
    },
  },
  extraReducers: {
    [ListKanban.pending]: (state) => {},
    [ListKanban.rejected]: (state) => {},
    [ListKanban.fulfilled]: (state, action) => {
      // state = [];
      let Job_List = action.payload;
      if (state.length == 0) {
        Job_List.map((Eachjob) => {
          state.push({
            id_job: Eachjob._id,
            title: Eachjob.title,
            process: Eachjob.process,
            priority: Eachjob.priority,
            is_completed: Eachjob.is_completed || false,
            start_time: moment(Eachjob.start_time).format("YYYY-MM-DD"),
            end_time: moment(Eachjob.end_time).format("YYYY-MM-DD"),
            members: [
              "https://www.w3schools.com/howto/img_avatar.png",
              "https://labhouse.vn/Content/ImageUpload/LAB/dlgECMSItem/163/avatar6%20(1).png",
              "https://anest.dev/assets/images/avatar.png",
              "https://cdn5.vectorstock.com/i/1000x1000/25/54/businessman-profile-ico-vector-20022554.jpg",
              "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg",
              "https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/17786/optimized_large_thumb_stage.jpg",
            ],
          });
        });
      }
    },
    [AddNewJobkanban.pending]: (state) => {},
    [AddNewJobkanban.rejected]: (state) => {},
    [AddNewJobkanban.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [DeleteAJob.pending]: (state) => {},
    [DeleteAJob.rejected]: (state) => {},
    [DeleteAJob.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [EditAJob.pending]: (state) => {},
    [EditAJob.rejected]: (state) => {},
    [EditAJob.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
  },
});

const { reducer, actions } = kanban;
export const { addKanban, deleteKanban, updateKanban } = actions;
export default reducer;
