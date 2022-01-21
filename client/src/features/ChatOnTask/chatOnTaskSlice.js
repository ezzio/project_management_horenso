import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import detailTaskApi from "api/detailTask";
import moment from "moment";

const initialState = {
  loading: false,
  messages: [],
};
export const listChatAsync = createAsyncThunk(
  "ConversationTask/sendChat",
  async (params, thunkAPI) => {
    let sendChatOnTask = await detailTaskApi.listConversationsInDetailTask(
      params
    );
    return sendChatOnTask;
  }
);

const chatOnTaskSlice = createSlice({
  name: "chat-on-task",
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
        // console.log(current(state.messages)[state.messages.length - 1]);
        state.messages[state.messages.length - 1].mess.push(
          action.payload.mess[0]
        );
      } else state.messages.push(action.payload);
      //   console.log(current(state.messages)[state.messages.length - 1]);
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
        sendAt: Date.now(),
        mess: [newMessage.message],
      };
      if (
        newMessage.user_name ==
          current(state.messages)[state.messages.length - 1].user.user_name &&
        moment(newMessageRecive.sendAt).diff(
          current(state.messages)[state.messages.length - 1].sendAt,
          "second"
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
      state.messages = [];
      let payload = action.payload;
      if (payload.isSuccess && payload.resultConversation.length > 0) {
        let TempMessage = [];
        let tempuser = payload.resultConversation[0].user_name;
        let tempdisplayName = payload.resultConversation[0].display_name;
        let tempavatar = payload.resultConversation[0].avatar;
        let tempSendAt = payload.resultConversation[0].sendAt;
        payload.resultConversation.forEach((eachMessage, index) => {
          if (
            tempuser == eachMessage.user_name &&
            moment(eachMessage.sendAt).diff(tempSendAt, "second") < 60
          ) {
            TempMessage.push(eachMessage.line_text);
            if (index == payload.resultConversation.length - 1) {
              state.messages.push({
                user: {
                  user_name: tempuser,
                  display_name: tempdisplayName,
                  avatar: tempavatar,
                },
                mess: [eachMessage.line_text],
              });
            }
          } else if (
            tempuser == eachMessage.user_name &&
            index == payload.resultConversation.length - 1
          ) {
            state.messages.push({
              user: {
                user_name: tempuser,
                display_name: tempdisplayName,
                avatar: tempavatar,
              },
              mess: [...TempMessage, eachMessage.line_text],
            });
          } else if (index == payload.resultConversation.length - 1) {
            state.messages.push({
              user: {
                user_name: tempuser,
                display_name: tempdisplayName,
                avatar: tempavatar,
              },
              mess: TempMessage,
            });

            state.messages.push({
              user: {
                user_name: eachMessage.user_name,
                display_name: eachMessage.display_name,
                avatar: eachMessage.avatar,
              },
              mess: [eachMessage.line_text],
            });
          } else {
            state.messages.push({
              user: {
                user_name: tempuser,
                display_name: tempdisplayName,
                avatar: tempavatar,
              },
              mess: TempMessage,
            });
            tempuser = eachMessage.user_name;
            tempdisplayName = eachMessage.display_name;
            tempavatar = eachMessage.avatar;
            tempSendAt = eachMessage.sendAt;
            TempMessage = [eachMessage.line_text];
          }
        });
      }

      // if (action.payload) message.success("Create successful");
    },
  },
});

export default chatOnTaskSlice.reducer;
export const { sendMessage, newMessage } = chatOnTaskSlice.actions;
