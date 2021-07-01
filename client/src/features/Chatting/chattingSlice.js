import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const chattingSlice = createSlice({
  name: "chatting",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { sendMessage } = chattingSlice.actions;

export default chattingSlice.reducer;
