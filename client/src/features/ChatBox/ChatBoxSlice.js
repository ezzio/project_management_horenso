import { createSlice, current } from '@reduxjs/toolkit';
import moment from 'moment';

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

export const chatBoxSlice = createSlice({
  name: 'chatbox',
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
    sendRepliedMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    sendImage: (state, action) => {
      state.messages.push(action.payload);
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
});

export const {
  sendMessage,
  sendRepliedMessage,
  sendImage,
  messageReactionLike,
  messageReactionDisLike,
} = chatBoxSlice.actions;
export default chatBoxSlice.reducer;
