import Chatbox from 'features/ChatBox - Conversation/Chatbox';
import Listchannel from 'features/ListChannel - Conversation/ListChannel';
import React, { useState } from 'react';
import './Conversation.scss';

const Conversation = () => {
  const [openCreatechannel, setOpenCreatechannel] = useState(false);
  return (
    <div className="ctn ctn-con">
      <Listchannel />
      <Chatbox />
    </div>
  );
};

export default Conversation;
