import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { accountApi } from "api/accountApi";
// import { MeetingRoom } from "api/MeetingAPI";
import { RootState } from "app/store";
// import { RoomMeeting } from "constants/RoomMeeting";

const initialState = {
  socketId: "",
  username: "",
  avatarUrl: "",
  MemberInRoom: [],
  loadding: true,
  video: true,
  audio: true,
};
// export const GetInfoUser = createAsyncThunk(
//   "Room/infoUser",
//   async (user) => {
//     const response = await accountApi.UserInfo(user);
//     return response.data;
//   }
// );
// export const CheckRoomExists = createAsyncThunk(
//   "Room/CheckMeetingRoomIsExists",
//   async (RoomId) => {
//     const response = await MeetingRoom.CheckMeetingRoomIsExists(RoomId);
//     return response.data;
//   }
// );
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
      action.payload.socket.emit("close_camera", {
        username: localStorage.getItem("username"),
        avatar: localStorage.getItem("avatar"),
        ownerId: localStorage.getItem("owner"),
        currentRoom: localStorage.getItem("currentRoom"),
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
      state.MemberInRoom = action.payload;
    },
    someOneDisconnect: (state, action) => {
      state.MemberInRoom = action.payload.userCurrent;
      let userDisconect = action.payload.userDisconect;
      // let videoGird = document.getElementById("video-grid");
      // if (videoGird) {
      //   videoGird.classList.remove(userDisconect);
      // }
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(GetInfoUser.pending, (state) => {
  //       state.loadding = true;
  //     });
  //     builder.addCase(GetInfoUser.rejected, (state) => {
  //       state.loadding = false;
  //     });
  //     builder.addCase(GetInfoUser.fulfilled, (state, action) => {
  //       if (action.payload.isSuccess) {
  //         state.username = action.payload.username;
  //         state.avatarUrl = action.payload.avatar;
  //         localStorage.setItem("username", action.payload.username);
  //       }
  //       /// commet khi chay online
  //       // else {
  //       //   window.location.replace(`http://localhost:3000/sign`);
  //       //   localStorage.clear();
  //       // }
  //     });
  //   },
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
} = RoomMeetingSlice.actions;
export const selectuserInRoom = (state) => state.RoomMeeting;

// export const { addKanban, deleteKanban, updateKanban } = actions;
// export default reducer;
