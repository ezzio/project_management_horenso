import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImAttachment } from 'react-icons/im';
import { BiConfused, BiImageAdd } from 'react-icons/bi';
import BubbleChat from 'features/ChatOnTask/components/BubbleChat';
import './Chatbox.scss';
import { sendMessage, sendRepliedMessage } from './ChatBoxSlice';
import { Form, message, Input, Button, Space } from 'antd';
import moment from 'moment';
import Title from 'antd/lib/typography/Title';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';

const Chatbox = () => {
  const [repliedMessage, setRepliedMessage] = useState('');
  const [repliedContainer, setRepliedContainer] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chatBox.messages);

  console.log(repliedMessage);

  const onClickReplyMessage = (item) => {
    setRepliedContainer(true);
    setRepliedMessage(item);
  };
  const onHandleSubmit = (data) => {
    if (data.message && !repliedMessage) {
      const tempMessage = {
        user: {
          user_name: 'Tuong Minh',
          display_name: 'loo',
          avatar: 'lmao',
        },
        sendAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        mess: [data.message],
        replied_message: null,
      };
      form.resetFields();
      setRepliedContainer(false);
      dispatch(sendMessage(tempMessage));
      console.log(tempMessage);
    } else if (data.message && repliedMessage) {
      const feedbackMessage = {
        user: {
          user_name: 'Tuong Minh',
          display_name: 'loo',
          avatar: 'lmao',
        },
        sendAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        mess: [data.message],
        replied_message: repliedMessage,
      };
      form.resetFields();
      setRepliedContainer(false);
      setRepliedMessage('');
      dispatch(sendRepliedMessage(feedbackMessage));
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null)
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);

  const [form] = Form.useForm();

  return (
    <div className="chatbox">
      <div className="chatbox__content">
        {messages.length === 0 ? (
          <Title level={2}>Let's talk with your partner now!</Title>
        ) : (
          messages.map((message, index) => (
            <BubbleChat
              key={index}
              index={index}
              user={message.user}
              sendAt={message.sentAt}
              mess={message.mess}
              replied_message={message.replied_message}
              message={message}
              handleClickReply={onClickReplyMessage}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <Form
        layout="horizontal"
        size="small"
        form={form}
        onFinish={onHandleSubmit}
        className="chatbox__control"
      >
        {repliedContainer && (
          <div className="chatbox__control__replied-container">
            <Text style={{ color: '#fff', marginBottom: '0' }}>
              {repliedMessage}
            </Text>
            <Button
              onClick={() => setRepliedContainer(false)}
              type="default"
              shape="circle"
              icon={<CloseOutlined />}
              size="small"
            />
          </div>
        )}

        <Form.Item name="message" style={{ width: '100%' }}>
          <Input
            placeholder="Enter your message..."
            size="large"
            suffix={
              <Space>
                <ImAttachment />
                <BiImageAdd />
                <BiConfused />
                <Button type="primary" htmlType="submit">
                  <SendOutlined />
                </Button>
              </Space>
            }
          />
        </Form.Item>
      </Form>
      {/* <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="chatbox__control"
      >
        <input
          // ref={inputRef}
          type="text"
          name="message"
          className="chatbox__control__input"
          placeholder="Enter your message..."
          autoComplete="off"
          {...register('message', {
            required: 'This field is required',
          })}
        /> */}

      {/* <section className="chatbox__control__optional">
          <section>
            <ImAttachment />
            <BiImageAdd />
            <BiConfused />
          </section>
          <button className="send" type="submit">
            <RiSendPlaneFill />
          </button>
        </section> */}
      {/* </form> */}
    </div>
  );
};

export default Chatbox;
