import { Avatar, Space, Input, Button, Form, Drawer } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import BubbleChat from "./components/BubbleChat";
import "./ChatOnTask.scss";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Title from "antd/lib/typography/Title";
import { listUserInfo } from "pages/UserSettings/UserSettingSlice";
import moment from "moment";
import { sendMessage, newMessage, listChatAsync } from "./chatOnTaskSlice";
import { io, Socket } from "socket.io-client";
let socket = io("https://servernckh.herokuapp.com");
// let socket = io("http://localhost:4000");
const ChatOnTask = ({ visible, onClose }) => {
  const dispatch = useDispatch();

  // declare data
  const messages = useSelector((state) => state.chatOnTask.messages);
  const user = useSelector((state) => state.userSetting);
  const { idTask } = useParams();

  useEffect(() => {
    dispatch(listUserInfo());
    dispatch(listChatAsync({ idTask }));
    socket.emit("chat-connectToRoom", {
      id: localStorage.getItem("access_token"),
      avatarURL: user.avatarURL,
      display_name: user.display_name,
      user_name: user.name,
      room_id: idTask,
    });
    socket.on("newMessages", (message) => {
      dispatch(newMessage(message));
    });
  }, []);

  // Hanlde form
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (values.mess) {
      form.resetFields();
      inputRef.current.focus({
        cursor: "start",
      });
      const tempMessage = {
        user: {
          user_name: user.name,
          display_name: user.display_name,
          avatar: user.avatarURL,
        },
        sendAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        mess: [values.mess],
      };
      socket.emit("sendMessage", {
        message: values.mess,
        avatarURL: user.avatarURL,
        display_name: user.display_name,
        user_name: user.name,
        room_id: idTask,
      });
      dispatch(sendMessage(tempMessage));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // socket

  // focus
  const inputRef = useRef(null);

  // scroll
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current !== null)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <Drawer
      title="Chat on task"
      placement="right"
      onClose={onClose}
      visible={visible}
      size="large"
      width={450}
    >
      <div className="chat-on-task__body">
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
      <div className="chat-on-task__footer">
        <Form
          name="chat-on-task"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item name="mess">
            <Input
              width={"400px"}
              size="large"
              suffix={
                <Button
                  shape="circle"
                  type="primary"
                  htmlType="submit"
                  icon={<SendOutlined />}
                />
              }
              ref={inputRef}
              bordered={false}
              style={{
                backgroundColor: "#eee",
                height: "50px",
                borderRadius: "5px",
              }}
            />
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
};

export default ChatOnTask;
