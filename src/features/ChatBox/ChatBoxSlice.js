import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
// import { createSlice, current,  } from "@reduxjs/toolkit";
import channelApi from "api/channelApi";
const initialState = {
  avatar: "",
  display_name: "",
  user_name: "",
  socket: "",
  loading: false,
  messages: [],
  membersInConvers: [],
  like: [],
  dislike: [],
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

export const getLastedImage = createAsyncThunk(
  "Chatbox/getLastedImageAsync",
  async (params, thunkAPI) => {
    const response = await channelApi.getLastedImage(params);
    return response;
  }
);

export const chatBoxSlice = createSlice({
  name: "chatbox",
  initialState,
  reducers: {
    setSocketInChatBox: (state, action) => {
      state.socket = action.socket;
    },
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
      // state.messages.push(action.payload);
    },
    newMessage: (state, action) => {
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
        ) < 60 &&
        state.messages[state.messages.length - 1].type ===
          newMessageRecive.type &&
        state.messages[state.messages.length - 1].replied_message !== null
      ) {
        state.messages[state.messages.length - 1].mess.push({
          text: newMessage.mess,
          isLiked: false,
          isDisLiked: false,
        });
      } else state.messages.push(newMessageRecive);
    },
    messageReactionLike: (state, action) => {
      console.log(state.messages[action.payload.bubbleChatIndex])
      state.messages[action.payload.bubbleChatIndex].like.push({
        user_name: action.payload.infoLiked.user_name,
      });
    },
    messageReactionDisLike: (state, action) => {
      state.messages[action.payload.bubbleChatIndex].dislike.push({
        user_name: action.payload.infoDisLiked.user_name,
      });
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
              sendAt: message.sendAt,
              like: message.like,
              dislike: message.dislike,
              mess: [
                {
                  idTextChat: message._id,
                  text: message.line_text,
                  isLiked: false,
                  isDisLiked: false,
                },
              ],
              replied_message: message.replyMessage.map(
                (item) => item.textchat
              ),
              // type: 'text',
              // replied_message: null,
              type: message.type,
            });
          } else {
            if (
              stateUpdate[stateUpdate?.length - 1].user.user_name ===
                message.user_name &&
              moment(message.sendAt).diff(
                moment(stateUpdate[stateUpdate?.length - 1].user.sendAt),
                "second"
              ) < 60 &&
              stateUpdate[stateUpdate?.length - 1].type === message.type &&
              message.replyMessage.length < 0
            ) {
              stateUpdate[stateUpdate?.length - 1].mess.push({
                idTextChat: message._id,
                text: message.line_text,
                like: message.like,
                dislike: message.dislike,
                like: message.like,
              });
            } else {
              if (message.replyMessage.length > 0 && message.type !== "image") {
                let newMessageRely = [];

                stateUpdate.push({
                  user: {
                    avatar: message.avatar,
                    displayName: message.displayName,
                    sendAt: message.sendAt,
                    user_name: message.user_name,
                  },
                  sendAt: message.sendAt,
                  like: message.like,
                  dislike: message.dislike,
                  mess: [
                    {
                      idTextChat: message._id,
                      text: message.line_text,
                      isLiked: message.like,
                      isDisLiked: message.dislike,
                    },
                  ],
                  replied_message: null,
                  type: message.type,
                });
                message.replyMessage.forEach((item, index) => {
                  if (
                    index !== 0 &&
                    item.user_name ===
                      newMessageRely[newMessageRely.length - 1].user_name
                  ) {
                    newMessageRely[newMessageRely.length - 1].textchat.push(
                      item.textchat
                    );
                  } else {
                    newMessageRely.push({
                      avatar: item.avatar,
                      displayName: item.displayName,
                      replyAt: item.replyAt,
                      textchat: [item.textchat],
                      user_name: item.user_name,
                    });
                  }
                });
                newMessageRely.forEach((item) => {
                  // item.textchat.forEach((textChatRely) => {
                  stateUpdate.push({
                    user: {
                      avatar: item.avatar,
                      displayName: item.displayName,
                      sendAt: item.sendAt,
                      user_name: item.user_name,
                    },
                    sendAt: message.sendAt,

                    mess: item.textchat.map((textChatRely) => {
                      return {
                        idTextChat: item._id,
                        text: textChatRely,
                        isLiked: false,
                        isDisLiked: false,
                      };
                    }),
                    replied_message: message.line_text,
                    type: message.type,
                  });
                  // });
                });
              } else {
                stateUpdate.push({
                  user: {
                    avatar: message.avatar,
                    displayName: message.displayName,
                    sendAt: message.sendAt,
                    user_name: message.user_name,
                  },
                  sendAt: message.sendAt,
                  like: message.like,
                  dislike: message.dislike,
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

    [getLastedImage.pending]: (state) => {
      // state.loading = true;
    },
    [getLastedImage.rejected]: (state) => {
      // state.loading = false;
    },
    [getLastedImage.fulfilled]: (state, action) => {
      let newMessage = action.payload;
      let newMessageRecive = {
        user: {
          user_name: newMessage.user_name,
          display_name: newMessage.displayName,
          avatar: newMessage.avatarURL,
        },
        like: [],
        dislike: [],
        sendAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        mess: [{ text: newMessage.mess, isLiked: false, isDisLiked: false }],
        replied_message: null,
        type: "image",
      };
      if (
        state.messages[state.messages.length - 1] &&
        current(state.messages)[state.messages.length - 1].user.user_name ===
          action.payload.user_name &&
        moment(action.payload.sendAt).diff(
          moment(current(state.messages)[state.messages.length - 1].sendAt),
          "second"
        ) < 60 &&
        state.messages[state.messages.length - 1].type === newMessageRecive.type
      ) {
        state.messages[state.messages.length - 1].mess.push({
          text: newMessage.mess,
          isLiked: false,
          isDisLiked: false,
        });
      } else state.messages.push(newMessageRecive);
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
  setSocketInChatBox,
} = chatBoxSlice.actions;
export default chatBoxSlice.reducer;
