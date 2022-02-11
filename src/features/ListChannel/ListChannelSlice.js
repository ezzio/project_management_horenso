import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspace: [
    {
      id: 1,
      name:"Project Ideas", 
      members: [],
    },
    { 
      id: 2,
      name: "Confirm Content",
      members: [],
    },
    { 
      id: 3,
      name: "Waiting for review",
      members: [],
    }
  ],
  teams: [
    { id: 1,
      name: "Developers",
      members: [],
    }, 
    { 
      id: 2,
      name: "Designer",
      members: [],
    }
  ],
  others: [
    { 
      id: 1,
      name: "Off-Topic",
      members: [],
    },
    {
      id: 2, 
      name: "Archive",
      members: [],
    },
  ],
  members: [
    {  
      id: 1, 
      user_name: "Dang Khoa",
      avaURL: 'https://i.pinimg.com/474x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg',
    },
    {  
      id: 2, 
      user_name: "Huu Thang",
      avaURL: 'https://i.pinimg.com/474x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg',
    },
    {  
      id: 3, 
      user_name: "Chanh Nhut",
      avaURL: 'https://i.pinimg.com/474x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg',
    },
    {  
      id: 4, 
      user_name: "Phu Nguyen",
      avaURL: 'https://i.pinimg.com/474x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg',
    },
    {  
      id: 5, 
      user_name: "Tuong Minh",
      avaURL: 'https://i.pinimg.com/474x/9b/47/a0/9b47a023caf29f113237d61170f34ad9.jpg',
    },
  ],
};

export const createChannelSlice = createSlice({
  name: "createChannel",
  initialState,
  reducers: {
    addWorkspaceChannel: (state, action) => {
      const newChannel = {
        id: state.workspace[state.workspace.length - 1].id + 1,
        name: action.payload.name
      }
      console.log(newChannel);
      state.workspace.push(newChannel);
    },
    addTeamsChannel: (state, action) => {
      const newChannel = {
        id: state.teams[state.teams.length - 1].id + 1,
        name: action.payload.name
      }
      console.log(newChannel);
      state.teams.push(newChannel);
    },
    addOthersChannel: (state, action) => {
      const newChannel = {
        id: state.others[state.others.length - 1].id + 1,
        name: action.payload.name
      }
      console.log(newChannel);
      state.others.push(newChannel);
    },
    deleteChannel: (state, action) => {
      if (action.payload.type === 'workspace') {
        const newChannelList = state.workspace.filter((channel) => {
            return (
              channel.id != action.payload.id
        )})
        state.workspace = newChannelList;
      }
      else if (action.payload.type === 'teams') {
        const newChannelList = state.teams.filter((channel) => {
            return (
              channel.id != action.payload.id
        )})
        state.teams = newChannelList;
      }
      else if (action.payload.type === 'others') {
        const newChannelList = state.others.filter((channel) => {
            return (
              channel.id != action.payload.id
        )})
        state.others = newChannelList;
      }
    },
    changeChannelName: (state, action) => {
      if (action.payload.type === 'workspace') {
        const newChannelList = state.workspace.filter((channel) => {
          if (channel.id === action.payload.id) {
            channel.name = action.payload.newName;
          }
          return (
            channel
        )})
        state.workspace = newChannelList;
      }
      else if (action.payload.type === 'teams') {
        const newChannelList = state.teams.filter((channel) => {
          if (channel.id === action.payload.id) {
            channel.name = action.payload.newName;
          }
          return (
            channel
        )})
        state.teams = newChannelList;
      }
      else if (action.payload.type === 'others') {
        const newChannelList = state.others.filter((channel) => {
          if (channel.id === action.payload.id) {
            channel.name = action.payload.newName;
          }
          return (
            channel
        )})
        state.others = newChannelList;
      }
    },
    inviteMember: (state, action) => {
      if (action.payload.type === 'workspace') {
        const newChannelList = state.workspace.filter((channel) => {
          if (channel.id === action.payload.id) {
            channel.members = action.payload.members;
            console.log(channel.members)
          }
          return (
            channel
        )})
        state.workspace = newChannelList;
      }
      else if (action.payload.type === 'teams') {
        const newChannelList = state.teams.filter((channel) => {
          if (channel.id === action.payload.id) {
            channel.members = action.payload.members;
            console.log(channel.members)
          }
          return (
            channel
        )})
        state.teams = newChannelList;
      }
      else if (action.payload.type === 'others') {
        const newChannelList = state.others.filter((channel) => {
          if (channel.id === action.payload.id) {
            channel.members = action.payload.members;
            console.log(channel.members)
          }
          return (
            channel
        )})
        state.others = newChannelList;
      }
    },
  },
});

export const 
{ 
  addWorkspaceChannel, 
  addTeamsChannel, 
  addOthersChannel, 
  deleteChannel, 
  changeChannelName,
  inviteMember,
} = createChannelSlice.actions;
export default createChannelSlice.reducer;
