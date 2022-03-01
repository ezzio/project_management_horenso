import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import detailTaskApi from 'api/detailTask';
import moment from 'moment';

const initialState = {
  loading: false,
  messages: [],
};
export const listChatAsync = createAsyncThunk(
  'ConversationTask/sendChat',
  async (params, thunkAPI) => {
    let sendChatOnTask = await detailTaskApi.listConversationsInDetailTask(
      params
    );
    return sendChatOnTask;
  }
);

const chatOnTaskSlice = createSlice({
  name: 'chat-on-task',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      if (
        state.messages[state.messages.length - 1] &&
        current(state.messages)[state.messages.length - 1].user.user_name ===
          action.payload.user.user_name &&
        moment(action.payload.sendAt).diff(
          moment(current(state.messages)[state.messages.length - 1].sendAt),
          'second'
        ) < 60
      ) {
        state.messages[state.messages.length - 1].mess.push(
          action.payload.mess[0]
        );
      } else state.messages.push(action.payload);
    },
    newMessage: (state, action) => {
      let newMessage = action.payload;
      let newMessageRecive = {
        user: {
          user_name: newMessage.user_name,
          display_name: newMessage.display_name,
          avatar: newMessage.avatarURL,
        },
        sendAt: Date.now(),
        mess: [newMessage.message],
      };
      if (
        newMessage.user_name ==
          current(state.messages)[state.messages.length - 1].user.user_name &&
        moment(newMessageRecive.sendAt).diff(
          current(state.messages)[state.messages.length - 1].sendAt,
          'second'
        ) < 60
      ) {
        state.messages[state.messages.length - 1].mess.push(newMessage.message);
      } else {
        state.messages.push(newMessageRecive);
      }
    },
  },
  extraReducers: {
    [listChatAsync.pending]: (state) => {
      state.loading = true;
    },
    [listChatAsync.rejected]: (state) => {
      state.loading = false;
    },
    [listChatAsync.fulfilled]: (state, action) => {
      state.loading = false;
      const stateUpdate = [];
      const { resultConversation } = action.payload;
      resultConversation.forEach((message) => {
        if (stateUpdate?.length === 0) {
          stateUpdate.push({
            user: {
              avatar: message.avatar,
              displayName: message.displayName,
              sendAt: message.sendAt,
              user_name: message.user_name,
            },
            mess: [message.line_text],
          });
        } else {
          if (
            stateUpdate[stateUpdate?.length - 1].user.user_name ===
              message.user_name &&
            moment(stateUpdate[stateUpdate?.length - 1].user.sendAt).diff(
              moment(message.sendAt),
              'second'
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
              mess: [message.line_text],
            });
          }
        }
      });
      state.messages = stateUpdate;
    },
  },
});

export default chatOnTaskSlice.reducer;
export const { sendMessage, newMessage } = chatOnTaskSlice.actions;
