import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
// import { createSlice, current,  } from "@reduxjs/toolkit";
import channelApi from "api/channelApi";
const initialState = {
  loading: false,
  messages: [
    // {
    //   userId: 1,
    //   createAt: '2021-04-12 16:30:18',
    //   userName: 'Dang Khoa',
    //   textChat: 'Hi, this is a first message',
    //   fileUrl: null,
    //   statusPin: false,
    //   role: 'pm',
    // },
    // {
    //   userId: 2,
    //   createAt: '2021-04-12 16:30:20',
    //   userName: 'Phu Nguyen',
    //   textChat: 'yeah !',
    //   fileUrl: null,
    //   statusPin: false,
    //   role: 'dev',
    // },
    // {s
    //   userId: 2,
    //   createAt: '2021-04-12 16:30:22',
    //   userName: 'Phu Nguyen',
    //   textChat: 'it is working',
    //   fileUrl: null,
    //   statusPin: false,
    //   role: 'dev',
    // },
  ],
};
export const listRoomChatAsync = createAsyncThunk(
  "ConversationTask/listMesageInRoom",
  async (params, thunkAPI) => {
    let sendChatOnTask = await channelApi.listRoomConversation(params);
    return sendChatOnTask;
  }
);

export const chatBoxSlice = createSlice({
  name: "chatbox",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      if (
        state.messages[state.messages.length - 1] &&
        current(state.messages)[state.messages.length - 1].user.user_name ===
          action.payload.user.user_name &&
        moment(action.payload.sendAt).diff(
          moment(current(state.messages)[state.messages.length - 1].sendAt),
          "second"
        ) < 60
      ) {
        state.messages[state.messages.length - 1].mess.push(
          action.payload.mess[0]
        );
      } else state.messages.push(action.payload);
    },
    sendRepliedMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    sendImage: (state, action) => {
      state.messages.push(action.payload);
    },
    newMessage: (state, action) => {
      console.log(action.payload);
      let newMessage = action.payload;
      let newMessageRecive = {
        user: {
          user_name: newMessage.user_name,
          display_name: newMessage.display_name,
          avatar: newMessage.avatarURL,
        },
        sendAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        mess: [{ text: newMessage.mess, isLiked: false, isDisLiked: false }],
        replied_message: null,
        type: "text",
      };
      if (
        state.messages[state.messages.length - 1] &&
        current(state.messages)[state.messages.length - 1].user.user_name ===
          action.payload.user_name &&
        moment(action.payload.sendAt).diff(
          moment(current(state.messages)[state.messages.length - 1].sendAt),
          "second"
        ) < 60
      ) {
        state.messages[state.messages.length - 1].mess.push({
          text: newMessage.mess,
          isLiked: false,
          isDisLiked: false,
        });
      } else state.messages.push(newMessageRecive);
    },
    messageReactionLike: (state, action) => {
      state.messages[action.payload.bubbleChatIndex].mess[
        action.payload.index
      ].isLiked = true;
      state.messages[action.payload.bubbleChatIndex].mess[
        action.payload.index
      ].isDisLiked = false;
    },
    messageReactionDisLike: (state, action) => {
      state.messages[action.payload.bubbleChatIndex].mess[
        action.payload.index
      ].isLiked = false;
      state.messages[action.payload.bubbleChatIndex].mess[
        action.payload.index
      ].isDisLiked = true;
    },
  },
  extraReducers: {
    [listRoomChatAsync.pending]: (state) => {
      state.loading = true;
    },
    [listRoomChatAsync.rejected]: (state) => {
      state.loading = false;
    },
    [listRoomChatAsync.fulfilled]: (state, action) => {
      console.log(action.payload);
      const stateUpdate = [];
      const { infoRoom } = action.payload;

      infoRoom.textChat.forEach((message) => {
        console.log(message.avatar);
        if (stateUpdate?.length === 0) {
          stateUpdate.push({
            user: {
              avatar: message.avatar,
              displayName: message.displayName,
              sendAt: message.sendAt,
              user_name: message.user_name,
            },
            // mess: [message.line_text],
            sendAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            mess: [
              { text: message.line_text, isLiked: false, isDisLiked: false },
            ],
            replied_message: null,
            type: "text",
          });
        } else {
          if (
            stateUpdate[stateUpdate?.length - 1].user.user_name ===
              message.user_name &&
            moment(stateUpdate[stateUpdate?.length - 1].user.sendAt).diff(
              moment(message.sendAt),
              "second"
            ) < 60
          ) {
            stateUpdate[stateUpdate?.length - 1].mess.push(message.line_text);
          } else {
            stateUpdate.push({
              user: {
                avatar: message.avatar,
                displayName: message.displayName,
                sendAt: message.sendAt,
                user_name: message.user_name,
              },
              // mess: [message.line_text],
              sendAt: moment().format("YYYY-MM-DD HH:mm:ss"),
              mess: [
                { text: message.line_text, isLiked: false, isDisLiked: false },
              ],
              replied_message: null,
              type: "text",
            });
          }
        }
      });
      state.messages = stateUpdate;
    },
  },
});

export const {
  sendMessage,
  sendRepliedMessage,
  sendImage,
  newMessage,
  messageReactionLike,
  messageReactionDisLike,
} = chatBoxSlice.actions;
export default chatBoxSlice.reducer;
