import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImAttachment } from 'react-icons/im';
import { BiConfused, BiImageAdd } from 'react-icons/bi';
import BubbleChat from 'features/ChatOnTask/components/BubbleChat';
import './Chatbox.scss';
import { sendMessage } from './ChatBoxSlice';
import { Form, message, Input, Button, Space } from 'antd';
import moment from 'moment';
import Title from 'antd/lib/typography/Title';
import { SendOutlined } from '@ant-design/icons';

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

  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chatBox.messages);

  // const inputRef = useRef();

  const onHandleSubmit = (data) => {
    if (data.message) {
      // reset(message);
      // inputRef.current.focus({
      //   cursor: "start",
      // });
      const tempMessage = {
        user: {
          user_name: 'Tuong Minh',
          display_name: 'loo',
          avatar: 'lmao',
        },
        sendAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        mess: [data.message],
      };
      form.resetFields();
      dispatch(sendMessage(tempMessage));
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
              message={message}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <Form form={form} onFinish={onHandleSubmit} className="chatbox__control">
        <Form.Item name="message" style={{ width: '100%' }}>
          <Input
            placeholder="Enter your message..."
            autoSize={{ minRows: 1, maxRows: 6 }}
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
