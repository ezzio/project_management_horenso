import KanbanAPI from 'api/kanbanApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import { message } from 'antd';
export const ListKanban = createAsyncThunk(
  'Kanban/ListKanban',
  async (params, thunkAPI) => {
    const currentListKanban = await KanbanAPI.ListKanbanOfJob();
    return currentListKanban;
  }
);
export const AddNewJobkanban = createAsyncThunk(
  'Kanban/CreateAKanban',
  async (params) => {
    const current = await KanbanAPI.AddNewJob(params);
    return current;
  }
);
export const DeleteAJob = createAsyncThunk(
  'Kanban/deleteJob',
  async (params) => {
    // console.log(params);
    const current = await KanbanAPI.deleteJob(params);
    return current;
  }
);
export const EditAJob = createAsyncThunk('Kaban/editJob', async (params) => {
  // console.log(params);
  const current = await KanbanAPI.editJob(params);
  return current;
});

const initalKanbans = {
  loading: false,
  listJobs: [],
  membersInProject: [],
};

const kanban = createSlice({
  name: 'kanbans',
  initialState: initalKanbans,
  reducers: {
    // addKanban: (state, action) => {
    //   state.listJobs.push(action.payload);
    // },
    deleteKanban: (state, action) => {
      state.listJobs = state.listJobs.filter(
        (kanban) => kanban.id_job !== action.payload
      );
    },
    updateKanban: (state, action) => {
      const editedKanban = action.payload;
      const kanbanIndex = state.listJobs.findIndex(
        (kanban) => kanban.id_job === editedKanban.id_job
      );
      if (kanbanIndex >= 0) {
        state.listJobs.splice(kanbanIndex, 1, editedKanban);
      }
    },
  },
  extraReducers: {
    [ListKanban.pending]: (state) => {
      state.loading = true;
    },
    [ListKanban.rejected]: (state) => {
      state.loading = false;
    },
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
            start_time: moment(Eachjob.start_time).format('YYYY-MM-DD'),
            end_time: moment(Eachjob.end_time).format('YYYY-MM-DD'),
            members: members,
          });
        });
        state.membersInProject = Job_List.memberInProject;
        state.loading = false;
      }
    },
    [AddNewJobkanban.pending]: (state) => {
      state.loading = true;
    },
    [AddNewJobkanban.rejected]: (state) => {
      state.loading = false;
    },
    [AddNewJobkanban.fulfilled]: (state, action) => {
      console.log(action.payload);
      const newKanban = {
        ...action.payload.infoJob,
        id_job: action.payload.infoJob.idJob,
        members: action.payload.infoJob.memberInJob,
      };
      message.success('Success! This Job has been added');
      state.listJobs.push(newKanban);
      state.loading = false;
    },
    [DeleteAJob.pending]: (state) => {
      state.loading = true;
    },
    [DeleteAJob.rejected]: (state) => {
      state.loading = false;
    },
    [DeleteAJob.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
    },
    [EditAJob.pending]: (state) => {
      state.loading = true;
    },
    [EditAJob.rejected]: (state) => {
      state.loading = false;
    },
    [EditAJob.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
    },
  },
});

const { reducer, actions } = kanban;
export const { addKanban, deleteKanban, updateKanban } = actions;
export default reducer;
