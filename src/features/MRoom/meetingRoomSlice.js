import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
// import { accountApi } from "api/accountApi";
// import { MeetingRoom } from "api/MeetingAPI";
// import { RootState } from "app/store";
import MeetingRoom from "api/MeetingRoom";

const initialState = {
  socketId: "",
  roomName: "",
  startTime: "",
  username: "",
  displayName: "",
  avatarUrl: "",
  memberInMeeting: [],
  MemberInRoom: [],
  loadding: true,
  VideoAndAudio: true,
  video: true,
  audio: true,
};

export const listMemberInCanJoinMeetingRoomAsync = createAsyncThunk(
  "Room/CheckMeetingRoomIsExists",
  async (params) => {
    const response = await MeetingRoom.listMemberInCanJoinMeetingRoom(params);
    return response;
  }
);
export const RoomMeetingSlice = createSlice({
  name: "RoomMeeting",
  initialState,
  reducers: {
    stopBothVideoAndAudio: (state, action) => {
      action.payload.getTracks().forEach(function (track) {
        if (track.readyState == "live") {
          track.stop();
        }
      });
    },
    // stop only camera
    stopVideoOnly: (state, action) => {
      action.payload.getTracks().forEach(function (track) {
        if (track.readyState == "live" && track.kind === "video") {
          try {
            track.enabled = state.video;
          } catch (e) {}
        }
      });
      // state.video = !state.video;
    },
    // stop only mic
    stopAudioOnly: (state, action) => {
      action.payload.getTracks().forEach(function (track) {
        if (track.readyState == "live" && track.kind === "audio") {
          try {
            track.enabled = state.audio;
          } catch (e) {}
        }
      });
    },
    stopAudioButton: (state, action) => {
      state.audio = !state.audio;
    },
    stopVideoButton: (state, action) => {
      let { socket, roomId } = action.payload;
      socket.emit("close_camera", {
        username: sessionStorage.getItem("name"),
        avatar: sessionStorage.getItem("avatarURL"),
        ownerId: localStorage.getItem("access_token"),
        currentRoom: roomId,
      });
      state.video = !state.video;
    },
    joinRoom: (state, action) => {
      action.payload.socketInfo.emit("join_room", {
        username: action.payload.username,
        room_id: action.payload.RoomId,
        ownerId: localStorage.getItem("owner"),
        peerId: action.payload.peerId,
      });
    },
    someOneJoinRoom: (state, action) => {
      let newMemberInRoom = action.payload.map((item, index) => {
        return {
          id: item.idUser,
          display_name: item.username,
          user_name: item.username,
          avatar: item.avatar,
          RoomJoin: item.RoomJoin,
          audio: item.audio,

          camera: item.camera,

          peerId: item.peerId,
          socketId: item.socketId,
        };
      });
      state.MemberInRoom = newMemberInRoom;
    },
    // memberInRoomMeeting: (state, action) => {
  
    //   let newMemberInRoom = action.payload.map((item, index) => {
    //     return {
    //       id: item.idUser,
    //       display_name: item.username,
    //       user_name: item.username,
    //       avatar: item.avatar,
    //       RoomJoin: item.RoomJoin,
    //       audio: item.audio,
    //       camera: item.camera,
    //       peerId: item.peerId,
    //       socketId: item.socketId,
    //     };
    //   });
    //   state.MemberInRoom = newMemberInRoom;
    // },
    someOneDisconnect: (state, action) => {
      state.MemberInRoom = action.payload.userCurrent;
      let userDisconect = action.payload.userDisconect;
      // let videoGird = document.getElementById("video-grid");
      // if (videoGird) {
      //   videoGird.classList.remove(userDisconect);
      // }
    },
  },
  extraReducers: {
    [listMemberInCanJoinMeetingRoomAsync.pending]: (state) => {
      state.loading = true;
    },
    [listMemberInCanJoinMeetingRoomAsync.rejected]: (state, action) => {
      state.loading = true;
    },
    [listMemberInCanJoinMeetingRoomAsync.fulfilled]: (state, action) => {
      const {
        isSuccess,
        memberInMeetingRoom,
        infoUser,
        timeStartMeeting,
        name,
      } = action.payload;

      console.log(action.payload);
      if (isSuccess) {
        state.roomName = name;
        state.startTime = timeStartMeeting;
        state.username = infoUser.user_name;
        state.displayName = infoUser.display_name;
        state.avatarUrl = infoUser.avatar;
        state.memberInMeeting = memberInMeetingRoom;
      }
    },
  },
});
export default RoomMeetingSlice.reducer;
export const {
  joinRoom,
  someOneJoinRoom,
  someOneDisconnect,
  stopAudioOnly,
  stopVideoOnly,
  stopAudioButton,
  stopVideoButton,
  memberInRoomMeeting,
} = RoomMeetingSlice.actions;

// const { reducer, actions } = kanban;
// export const { addKanban, deleteKanban, updateKanban } = actions;
