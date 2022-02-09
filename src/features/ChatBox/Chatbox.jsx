import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImAttachment } from 'react-icons/im';
import { BiConfused, BiImageAdd } from 'react-icons/bi';
import BubbleChat from 'features/ChatOnTask/components/BubbleChat';
import './Chatbox.scss';
import { RiSendPlaneFill } from 'react-icons/ri';
import { sendMessage } from './ChatBoxSlice';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import moment from 'moment';
import Title from "antd/lib/typography/Title";

const Chatbox = () => {

  // const [messages, setMessages] = useState([
  //   {
  //     userId: 1,
  //     createAt: '12/04/2021 16:30:18',
  //     userName: 'Dang Khoa',
  //     textChat: 'Hi, this is a first message',
  //     fileUrl: null,
  //     statusPin: false,
  //     role: 'pm',
  //   },
  //   {
  //     userId: 2,
  //     createAt: '12/04/2021 16:30:20',
  //     userName: 'Phu Nguyen',
  //     textChat: 'yeah !',
  //     fileUrl: null,
  //     statusPin: false,
  //     role: 'dev',
  //   },
  //   {
  //     userId: 2,
  //     createAt: '12/04/2021 16:30:22',
  //     userName: 'Phu Nguyen',
  //     textChat: 'it is working',
  //     fileUrl: null,
  //     statusPin: false,
  //     role: 'dev',
  //   },
  // ]);
  const { 
    register,
    handleSubmit,
    reset,
  } = useForm();

  const dispatch = useDispatch()
  const messages = useSelector((state) => state.chatBox.messages)

    // const inputRef = useRef();

  const onHandleSubmit = (data) => {
    if (data.message) {
      reset(message);
      // inputRef.current.focus({
      //   cursor: "start",
      // });
      const tempMessage = {
        user: {
          user_name: 'Tuong Minh',
          display_name: 'loo',
          avatar: 'lmao',
        },
        sendAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        mess: [data.message],
      };
      dispatch(sendMessage(tempMessage));
    }
  };


  const messagesEndRef = useRef(null);


  const scrollToBottom = () => {
    if (messagesEndRef.current !== null)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chatbox">
      <div className="chatbox__content">
        {messages.length === 0 ? (
          <Title level={2}>Let's talk with your partner now!</Title>
        ) : (
          messages.map((message, index) => (
            <BubbleChat
              key={index}
              user={message.user}
              sendAt={message.sentAt}
              mess={message.mess}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit(onHandleSubmit)} className="chatbox__control">
        <input
          // ref={inputRef}
          type="text"
          name="message"
          className="chatbox__control__input"
          placeholder="Enter your message..."
          autoComplete='off'
          {...register('message', {
              required: 'This field is required',
          })}
        />

        <section className="chatbox__control__optional">
          <section>
            <ImAttachment />
            <BiImageAdd />
            <BiConfused />
          </section>
          <button className="send" type='submit'>
            <RiSendPlaneFill />
          </button>
        </section>
      </form>
    </div>
  );
};

export default Chatbox;
