import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
// import { createSlice, current,  } from "@reduxjs/toolkit";
import channelApi from "api/channelApi";
const initialState = {
  avatar: "",
  display_name: "",
  user_name: "",
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
  membersInConvers: [],
};

export const getInfoUser = createAsyncThunk(
  "ConversationTask/getInfoUser",
  async (params) => {
    const response = await channelApi.getInfoUser(params);
    return response;
  }
);
export const listRoomChatAsync = createAsyncThunk(
  "ConversationTask/listMesageInRoom",
  async (params, thunkAPI) => {
    let sendChatOnTask = await channelApi.listRoomConversation(params);
    return sendChatOnTask;
  }
);

export const reactionMessage = createAsyncThunk(
  "Chatbox/reactionMessage",
  async (params, thunkAPI) => {
    const current = await channelApi.reactionMessage(params);
    return current;
  }
);

export const replyMessageAsync = createAsyncThunk(
  "Chatbox/replyMessageAsync",
  async (params, thunkAPI) => {
    const current = await channelApi.replyMessage(params);
    return current;
  }
);

export const chatBoxSlice = createSlice({
  name: "chatbox",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      console.log(action.payload);
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
      // state.messages.push(action.payload);
    },
    newMessage: (state, action) => {
      console.log(action.payload);
      let newMessage = action.payload;
      let newMessageRecive = {
        user: {
          user_name: newMessage.user_name,
          display_name: newMessage.displayName,
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
    [getInfoUser.pending]: (state, action) => {},

    [getInfoUser.rejected]: (state, action) => {},
    [getInfoUser.fulfilled]: (state, action) => {
      let { isSuccess, infoUser } = action.payload;
      if (isSuccess) {
        state.avatar = infoUser.avatar;
        state.display_name = infoUser.displayName;
        state.user_name = infoUser.user_name;
      }
    },
    [listRoomChatAsync.pending]: (state) => {
      state.loading = true;
    },
    [listRoomChatAsync.rejected]: (state) => {
      state.loading = false;
    },
    [listRoomChatAsync.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      const stateUpdate = [];
      const { infoRoom, isSuccess } = action.payload;

      if (isSuccess) {
        state.membersInConvers = infoRoom.memberInRoom.map((item) => {
          let newObject = {
            ...item,
            is_online: true,
          };
          return newObject;
        });
        infoRoom.textChat.forEach((message) => {
          if (stateUpdate?.length === 0) {
            stateUpdate.push({
              user: {
                avatar: message.avatar,
                displayName: message.displayName,
                sendAt: message.sendAt,
                user_name: message.user_name,
              },
              sendAt: moment().format("YYYY-MM-DD HH:mm:ss"),
              mess: [
                {
                  idTextChat: message._id,
                  text: message.line_text,
                  isLiked: false,
                  isDisLiked: false,
                },
              ],
              replied_message: null,
              type: message.type,
            });
          } else {
            if (
              stateUpdate[stateUpdate?.length - 1].user.user_name ===
                message.user_name &&
              moment(message.sendAt).diff(
                moment(stateUpdate[stateUpdate?.length - 1].user.sendAt),
                "second"
              ) < 60
            ) {
              stateUpdate[stateUpdate?.length - 1].mess.push({
                idTextChat: message._id,
                text: message.line_text,
                isLiked: false,
                isDisLiked: false,
              });
            } else {
              // console.log('tao dong tin nhan moi');
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
                  {
                    idTextChat: message._id,
                    text: message.line_text,
                    isLiked: false,
                    isDisLiked: false,
                  },
                ],
                replied_message: null,
                type: message.type,
              });
            }
          }
        });
        state.messages = stateUpdate;
      }
    },

    [reactionMessage.pending]: (state) => {
      state.loading = true;
    },
    [reactionMessage.rejected]: (state) => {
      state.loading = false;
    },
    [reactionMessage.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
    },

    [replyMessageAsync.pending]: (state) => {
      state.loading = true;
    },
    [replyMessageAsync.rejected]: (state) => {
      state.loading = false;
    },
    [replyMessageAsync.fulfilled]: (state, action) => {
      state.loading = false;
    },

    // [sendImage.pending]: (state) => {
    //   state.loading = true;
    // },
    // [sendImage.rejected]: (state) => {
    //   state.loading = false;
    // },
    // [sendImage.fulfilled]: (state, action) => {
    //   state.loading = false;
    // },
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
