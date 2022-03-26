import { Spin } from "antd";
import Chatbox from "features/ChatBox/Chatbox";
import ConversationSetting from "features/ConversationSetting/ConversationSetting";
import Listchannel from "features/ListChannel/ListChannel";
import React, { useState, useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { listRoomChatAsync, getInfoUser } from "features/ChatBox/ChatBoxSlice";
import { useDispatch } from "react-redux";

import { newMessage } from "features/ChatBox/ChatBoxSlice";
import "./Conversation.scss";
// let socket = io("https://servernckhv2.herokuapp.com");
let socket = io("http://localhost:4000");
const Conversation = () => {
  const [openCreatechannel, setOpenCreatechannel] = useState(false);
  const loading = useSelector((state) => state.createChannel.loading);
  const user = useSelector((state) => state.chatBox);
  const { idRoom } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfoUser());
    console.log(user);
    socket.emit("chat-connectToRoomConversation", {
      id: localStorage.getItem("access_token"),
      avatarURL: sessionStorage.getItem("avatarURL"),
      display_name: user.display_name,
      user_name: sessionStorage.getItem("name"),
      room_id: idRoom,
    });
    socket.on("newMessagesConversation", (message) => {
      // console.log(message);
      
      dispatch(newMessage(message));
    });
  }, []);

  return (
    <div className="spin-ctn">
      <Spin
        tip="Loading..."
        size="large"
        spinning={loading}
        style={{ width: "100%", height: "100%" }}
        className="spinning"
      >
        <div className="ctn ctn-con">
          <Listchannel />

          <Switch>
            <Route exact path="/:idProject/conversation/:idRoom">
              <Chatbox socket={socket} />
              <ConversationSetting />
            </Route>
          </Switch>
        </div>
      </Spin>
    </div>
  );
};

export default Conversation;
