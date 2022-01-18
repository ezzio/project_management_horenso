import { createSlice, current } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
  loading: false,
  messages: [],
};

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
        console.log(current(state.messages)[state.messages.length - 1]);
        state.messages[state.messages.length - 1].mess.push(
          action.payload.mess[0]
        );
      } else state.messages.push(action.payload);
      //   console.log(current(state.messages)[state.messages.length - 1]);
    },
  },
});

export default chatOnTaskSlice.reducer;
export const { sendMessage } = chatOnTaskSlice.actions;
