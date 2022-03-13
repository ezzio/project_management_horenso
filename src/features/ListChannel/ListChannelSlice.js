import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import channelApi from 'api/channelApi';

export const getListChannel = createAsyncThunk(
  'channel/getListChannel',
  async (idProject, thunkAPI) => {
    const currentData = await channelApi.getListChannel(idProject);
    return currentData;
  }
);

export const addWorkSpaceChannelAsync = createAsyncThunk(
  'channel/addWorkSpaceChannelAsync',
  async (params, thunkAPI) => {
    console.log(params);
    const currentData = await channelApi.addWorkSpaceChannel(params);
    return currentData;
  }
);

export const addTeamChannelAsync = createAsyncThunk(
  'channel/addTeamChannelAsync',
  async (params, thunkAPI) => {
    console.log(params);
    const currentData = await channelApi.addTeamChannel(params);
    return currentData;
  }
);

export const addOtherChannelAsync = createAsyncThunk(
  'channel/addOtherChannelAsync',
  async (params, thunkAPI) => {
    const currentData = await channelApi.addOtherChannel(params);
    return currentData;
  }
);

export const deleteChannelAsync = createAsyncThunk(
  'channel/deleteChannel',
  async (params) => {
    const current = await channelApi.deleteChannel(params);
    return current;
  }
);

const initialState = {
  loading: false,
  conversationId: '',
  workspace: [],
  teams: [],
  others: [],
  members: [
    {
      id: 1,
      user_name: 'Dang Khoa',
      avaURL:
        'https://i.pinimg.com/474x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg',
    },
    {
      id: 2,
      user_name: 'Huu Thang',
      avaURL:
        'https://i.pinimg.com/474x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg',
    },
    {
      id: 3,
      user_name: 'Chanh Nhut',
      avaURL:
        'https://i.pinimg.com/474x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg',
    },
    {
      id: 4,
      user_name: 'Phu Nguyen',
      avaURL:
        'https://i.pinimg.com/474x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg',
    },
    {
      id: 5,
      user_name: 'Tuong Minh',
      avaURL:
        'https://i.pinimg.com/474x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg',
    },
  ],
};

export const createChannelSlice = createSlice({
  name: 'createChannel',
  initialState,
  reducers: {
    deleteChannel: (state, action) => {
      if (action.payload.type === 'workSpace') {
        const newChannelList = state.workspace.filter((channel) => {
          return channel.idRoom !== action.payload.id;
        });
        state.workspace = newChannelList;
      } else if (action.payload.type === 'teams') {
        const newChannelList = state.teams.filter((channel) => {
          return channel.idRoom !== action.payload.id;
        });
        state.teams = newChannelList;
      } else if (action.payload.type === 'others') {
        const newChannelList = state.others.filter((channel) => {
          return channel.idRoom !== action.payload.id;
        });
        state.others = newChannelList;
      }
    },
    changeChannelName: (state, action) => {
      if (action.payload.type === 'workSpace') {
        const newChannelList = state.workspace.filter((channel) => {
          if (channel.idRoom === action.payload.id) {
            channel.name = action.payload.newName;
          }
          return channel;
        });
        state.workspace = newChannelList;
      } else if (action.payload.type === 'teams') {
        const newChannelList = state.teams.filter((channel) => {
          if (channel.idRoom === action.payload.id) {
            channel.name = action.payload.newName;
          }
          return channel;
        });
        state.teams = newChannelList;
      } else if (action.payload.type === 'others') {
        const newChannelList = state.others.filter((channel) => {
          if (channel.idRoom === action.payload.id) {
            channel.name = action.payload.newName;
          }
          return channel;
        });
        state.others = newChannelList;
      }
    },
    inviteMember: (state, action) => {
      if (action.payload.type === 'workSpace') {
        const newChannelList = state.workspace.filter((channel) => {
          if (channel.id === action.payload.id) {
            channel.members = action.payload.members;
          }
          return channel;
        });
        state.workspace = newChannelList;
      } else if (action.payload.type === 'teams') {
        const newChannelList = state.teams.filter((channel) => {
          if (channel.id === action.payload.id) {
            channel.members = action.payload.members;
          }
          return channel;
        });
        state.teams = newChannelList;
      } else if (action.payload.type === 'others') {
        const newChannelList = state.others.filter((channel) => {
          if (channel.id === action.payload.id) {
            channel.members = action.payload.members;
          }
          return channel;
        });
        state.others = newChannelList;
      }
    },
  },
  extraReducers: {
    [getListChannel.pending]: (state) => {
      state.loading = true;
    },
    [getListChannel.rejected]: (state) => {},
    [getListChannel.fulfilled]: (state, action) => {
      state.loading = false;

      state.conversationId = action.payload.idConversation;
      state.workspace = action.payload.result[0].roomConversation;
      state.teams = action.payload.result[1].roomConversation;
      state.others = action.payload.result[2].roomConversation;
    },
    // add workspace channel
    [addWorkSpaceChannelAsync.pending]: (state) => {
      state.loading = true;
    },
    [addWorkSpaceChannelAsync.rejected]: (state) => {},
    [addWorkSpaceChannelAsync.fulfilled]: (state, action) => {
      state.loading = false;

      const newChannel = {
        id: action.payload.modal._id,
        name: action.payload.modal.name,
        members: action.payload.modal.memberInRoom,
      };
      console.log(newChannel);
      state.workspace.push(newChannel);
    },

    // add team channel
    [addTeamChannelAsync.pending]: (state) => {
      state.loading = true;
    },
    [addTeamChannelAsync.rejected]: (state) => {},
    [addTeamChannelAsync.fulfilled]: (state, action) => {
      state.loading = false;

      const newChannel = {
        id: action.payload.modal._id,
        name: action.payload.modal.name,
        members: action.payload.modal.memberInRoom,
      };
      console.log(newChannel);
      state.teams.push(newChannel);
    },

    // add other channel
    [addOtherChannelAsync.pending]: (state) => {
      state.loading = true;
    },
    [addOtherChannelAsync.rejected]: (state) => {},
    [addOtherChannelAsync.fulfilled]: (state, action) => {
      state.loading = false;

      const newChannel = {
        id: action.payload.modal._id,
        name: action.payload.modal.name,
        members: action.payload.modal.memberInRoom,
      };
      console.log(newChannel);
      state.others.push(newChannel);
    },

    //---------- Delete WorkSpace Channel -------->
    [deleteChannelAsync.pending]: (state) => {
      state.loading = true;
    },
    [deleteChannelAsync.rejected]: (state) => {
      state.loading = false;
    },
    [deleteChannelAsync.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      message.success('Channel deleted successfully!');
    },
    //<--------------------------------------------
  },
});

export const {
  addWorkspaceChannel,
  addTeamsChannel,
  addOthersChannel,
  deleteChannel,
  changeChannelName,
  inviteMember,
} = createChannelSlice.actions;
export default createChannelSlice.reducer;
