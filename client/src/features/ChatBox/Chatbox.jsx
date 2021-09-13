import React, { useRef, useState } from 'react';
import { ImAttachment } from 'react-icons/im';
import { BiConfused, BiImageAdd } from 'react-icons/bi';
import UserTag from 'components/UserTag/UserTag';
import './Chatbox.scss';
import { RiSendPlaneFill } from 'react-icons/ri';

const Chatbox = () => {
  const [messages, setMessages] = useState([
    {
      userId: 1,
      createAt: '12/04/2021 16:30',
      userName: 'Dang Khoa',
      textChat: 'Hi, this is a first message',
      fileUrl: null,
      statusPin: false,
      role: 'pm',
    },
    {
      userId: 2,
      createAt: '12/04/2021 16:30',
      userName: 'Phu Nguyen',
      textChat: 'yeah !',
      fileUrl: null,
      statusPin: false,
      role: 'dev',
    },
    {
      userId: 2,
      createAt: '12/04/2021 16:30',
      userName: 'Phu Nguyen',
      textChat: 'it is working',
      fileUrl: null,
      statusPin: false,
      role: 'dev',
    },
  ]);

  const checkMess = useRef();

  return (
    <div className="chatbox">
      <div className="chatbox__content">
        {messages.map((m) => {
          if (checkMess.current === m.userId) {
            return <p>{m.textChat}</p>;
          }
          checkMess.current = m.userId;
          return (
            <>
              <UserTag
                srcImg={m.fileUrl}
                userName={m.userName}
                createAt={m.createAt}
                role={m.role}
              />
              <p>{m.textChat}</p>
            </>
          );
        })}
      </div>
      <div className="chatbox__control">
        <input
          type="text"
          className="chatbox__control__input"
          placeholder="Enter your message..."
        />

        <section className="chatbox__control__optional">
          <section>
            <ImAttachment />
            <BiImageAdd />
            <BiConfused />
          </section>
          <button className="send">
            <RiSendPlaneFill />
          </button>
        </section>
      </div>
    </div>
  );
};

export default Chatbox;
