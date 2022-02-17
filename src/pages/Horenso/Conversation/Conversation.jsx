import { Spin } from "antd";
import Chatbox from "features/ChatBox/Chatbox";
import ConversationSetting from "features/ConversationSetting/ConversationSetting";
import Listchannel from "features/ListChannel/ListChannel";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Conversation.scss";

const Conversation = () => {
  const [openCreatechannel, setOpenCreatechannel] = useState(false);
  const loading = useSelector((state) => state.createChannel.loading);

  return (
    <>
      {/* <Spin
        tip="Loading..."
        size="large"
        spinning={loading}
        style={{ width: "100%", height: "100%" }}
      > */}
      <div className="ctn ctn-con">
        <Listchannel />
        <Chatbox />
        <ConversationSetting />
      </div>
      {/* </Spin> */}
    </>
  );
};

export default Conversation;
