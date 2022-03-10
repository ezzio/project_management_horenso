import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createChannelSlice } from "features/ListChannel/ListChannelSlice";
import MeetingRoomApi from "api/MeetingRoom";
import moment from "moment";

const initialState = {
  loading: false,
  meetingRooms: [],
  teamMembers: [
    {
      id: 1,
      name: "Khoa",
    },
    {
      id: 2,
      name: "Thang",
    },
    {
      id: 3,
      name: "Nguyen",
    },
    {
      id: 4,
      name: "Nhut",
    },
    {
      id: 5,
      name: "Minh",
    },
  ],
};

export const listMeetingRoom = createAsyncThunk(
  "/meetingRoom/ListMeetingRoom",
  async (params, thunkAPI) => {
    const response = await MeetingRoomApi.listMeetingRoomInProject(params);
    return response;
  }
);
export const createMettingRoom = createAsyncThunk(
  "/meetingRoom/CreateMettingRoom",
  async (params, thunkAPI) => {
    const response = await MeetingRoomApi.createMeetingRoom(params);

    return response;
  }
);

export const deleteMeetingRoom = createAsyncThunk(
  "/meeting/DeleteMeetingRoom",
  async (params, thunkAPI) => {
    const response = await MeetingRoomApi.deleteMeetingRoom(params);
    return response;
  }
);

export const meetingSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {},
  extraReducers: {
    [listMeetingRoom.pending]: (state) => {
      state.loading = true;
    },
    [listMeetingRoom.rejected]: (state, action) => {
      state.loading = true;
    },
    [listMeetingRoom.fulfilled]: (state, action) => {
      state.loading = false;
      const { isSuccess, infoMeetingRoom, memberInProject } = action.payload;
      if (isSuccess) {
        state.meetingRooms = infoMeetingRoom.map((room) => ({
          id: room.id,
          name: room.name,
          description: room.description,
          startTime: room.start_time,
          members: room.members,
          duration: [room.start_time, room.end_time],
        }));
        let members = memberInProject.map((member, index) => {
          return { id: index, name: member.user_name };
        });
        state.teamMembers = members;
      }
    },
    [createMettingRoom.pending]: (state) => {
      state.loading = true;
    },
    [createMettingRoom.rejected]: (state, action) => {
      state.loading = true;
    },
    [createMettingRoom.fulfilled]: (state, action) => {
      state.loading = false;
      const { isSuccess, newMeetingRoom } = action.payload;
      if (isSuccess) {
        let newMeetingRoomCreate = {
          id: newMeetingRoom._id,
          name: newMeetingRoom.name,
          description: newMeetingRoom.description,
          startTime: newMeetingRoom.timeStartMeeting,
          members: newMeetingRoom.members,
          duration: [newMeetingRoom.start_time, newMeetingRoom.end_time],
        };
        state.meetingRooms.push(newMeetingRoomCreate);
      }
    },
    [deleteMeetingRoom.pending]: (state) => {
      state.loading = true;
    },
    [deleteMeetingRoom.rejected]: (state, action) => {
      state.loading = true;
    },
    [deleteMeetingRoom.fulfilled]: (state, action) => {
      state.loading = false;
      const { isSuccess, idRoomRemove } = action.payload;
      if (isSuccess) {
        let newMeetingRoom = state.meetingRooms.filter(
          (eachMeetingRoom) => eachMeetingRoom.id != idRoomRemove
        );
        state.meetingRooms = newMeetingRoom;
        state.loading = false;
      }
    },
  },
});

export const { createMeeting } = meetingSlice.actions;
export default meetingSlice.reducer;
