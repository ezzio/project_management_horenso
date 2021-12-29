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
export const EditAJob = createAsyncThunk("Kanan/editJob", async (params) => {
  // console.log(params);
  const current = await KanbanAPI.editJob(params);
  return current;
});

const initalKanbans = {
  listJobs: [],
  membersInProject: [],
};

const kanban = createSlice({
  name: "kanbans",
  initialState: initalKanbans,
  reducers: {
    addKanban: (state, action) => {
      state.listJobs.push(action.payload);
    },
    deleteKanban: (state, action) => {
      console.log(action.payload);
      const deleteKanbanID = action.payload;
      return state.listJobs.filter(
        (kanban) => kanban.id_job !== deleteKanbanID
      );
    },
    updateKanban: (state, action) => {
      const editedKanban = action.payload;
      const kanbanIndex = state.listJobs.findIndex(
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
      let Job_List = action.payload;
      console.log(Job_List);
      if (Job_List) {
        state.listJobs = [];
        Job_List.ListJob.map((Eachjob) => {
          let members = [];
          Eachjob.members.map((mem) => {
            members.push(mem);
          });
          state.listJobs.push({
            id_job: Eachjob._id,
            title: Eachjob.title,
            process: Eachjob.process,
            priority: Eachjob.priority,
            is_completed: Eachjob.is_completed || false,
            start_time: moment(Eachjob.start_time).format("YYYY-MM-DD"),
            end_time: moment(Eachjob.end_time).format("YYYY-MM-DD"),
            members: members,
          });
        });
        state.membersInProject = Job_List.memberInProject;
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
