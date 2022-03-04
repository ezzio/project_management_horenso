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

export const meetingSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {
    createMeeting: (state, action) => {
      const current = moment();
      const newMeeting = {
        id: "291adw",
        name: action.payload.name,
        description: action.payload.description,
        startTime: action.payload.startTime,
        members: action.payload.members,
        moment: action.payload.moment,
      };
      console.log(newMeeting);
      console.log(newMeeting.moment.isAfter(current));
      state.meetingRooms.push(newMeeting);
    },
  },
  extraReducers: {
    [listMeetingRoom.pending]: (state) => {},
    [listMeetingRoom.rejected]: (state, action) => {},
    [listMeetingRoom.fulfilled]: (state, action) => {
      const { isSuccess, infoMeetingRoom, memberInProject } = action.payload;
      if (isSuccess) {
        state.meetingRooms = infoMeetingRoom.map((room) => ({
          id: room.id,
          name: room.name,
          description: room.description,
          startTime: room.start_time,
          members: room.members,
          moment: moment(room.start_time, "HH:mm DD/MM/YYYY"),
        }));
        let members = memberInProject.map((member, index) => {
          return { id: index, name: member.user_name };
        });
        state.teamMembers = members;
      }
    },
    [createMettingRoom.pending]: (state) => {},
    [createMettingRoom.rejected]: (state, action) => {},
    [createMettingRoom.fulfilled]: (state, action) => {
      const { isSuccess } = action.payload;
      if (isSuccess) {
        console.log(action.payload);
      }
    },
  },
});

export const { createMeeting } = meetingSlice.actions;
export default meetingSlice.reducer;
