import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BubbleChat from "features/ChatOnTask/components/BubbleChat";
import "./Chatbox.scss";
import {
  sendMessage,
  sendRepliedMessage,
  sendImage,
  replyMessageAsync,
  getInfoUser,
  setSocketInChatBox,
} from "./ChatBoxSlice";
import {
  Form,
  Input,
  Button,
  Space,
  Upload,
  message,
  Tooltip,
  Spin,
} from "antd";
import moment from "moment";
import Title from "antd/lib/typography/Title";
import {
  SendOutlined,
  CloseOutlined,
  PictureOutlined,
  FileAddOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import Text from "antd/lib/typography/Text";
import RenderImgMessage from "./components/RenderImgMessage";
import { listRoomChatAsync, newMessage, getLastedImage } from "./ChatBoxSlice";
import channelApi from "api/channelApi";

const Chatbox = ({ socket }) => {
  const [repliedMessage, setRepliedMessage] = useState("");
  const [repliedContainer, setRepliedContainer] = useState(false);
  const [idText, setIdText] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chatBox.messages);
  const infoUser = useSelector((state) => state.chatBox);
  const loading = useSelector((state) => state.chatBox.loading);

  const { idRoom } = useParams();
  //---------Upload Image-------------->

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || "image/png";
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isJpgOrPng) {
      message.error("Invalid file type or format");
    }
    if (!isLt5M) {
      message.error("File size must be smaller than 5MB");
    }
    return isJpgOrPng && isLt5M;
  };

  useEffect(() => {
    dispatch(getInfoUser());

    socket.emit("chat-connectToRoomConversation", {
      id: localStorage.getItem("access_token"),
      avatarURL: sessionStorage.getItem("avatarURL"),
      display_name: infoUser.display_name,
      user_name: sessionStorage.getItem("name"),
      room_id: idRoom,
    });
    socket.on("newMessagesConversation", (message) => {
      dispatch(newMessage(message));
    });
    socket.on("chatnewImageInConversation", (data) => {
      console.log("new image");
      dispatch(getLastedImage({ idRoom }));
    });
  }, []);

  // socket.on("chatnewImageInConversation", (data) => {
  //   dispatch(listRoomChatAsync({ idRoom }));
  // });
  useEffect(() => {
    dispatch(getInfoUser());
    dispatch(setSocketInChatBox({ socket }));
    dispatch(listRoomChatAsync({ idRoom }));
  }, [idRoom]);

  const handleChangeUpload = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        const newMessage = {
          user: {
            user_name: infoUser.user_name,
            display_name: infoUser.display_name,
            avatar: infoUser.avatar,
          },
          sendAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          replied_message: null,
          mess: imageUrl,
          type: "image",
        };
        dispatch(sendImage(newMessage));
        let data = new FormData();
        data.append("file", info.file.originFileObj);
        data.append("idUser", localStorage.getItem("access_token"));
        data.append("sendAt", newMessage.sendAt);
        data.append("type", "image");
        data.append("room_id", idRoom);
        channelApi.sendImage(data).then((data) => {
          socket.emit("chat-sendImageInConversation", { idRoom });
          dispatch(getLastedImage({ idRoom }));
        });
        // message.success("Upload avatar successful");
      });
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    let data = new FormData();
    data.append("file", file);
    data.append("owner", localStorage.getItem("access_token") || "");
    // data.append('room_id', roomId);
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  //<----------------------------------

  const onClickReplyMessage = (item, secondItem) => {
    setRepliedContainer(true);
    setRepliedMessage(item);
    setIdText(secondItem);
  };
  const onHandleSubmit = (data) => {
    if (data.message && !repliedMessage) {
      const tempMessage = {
        user: {
          user_name: infoUser.user_name,
          display_name: infoUser.display_name,
          avatar: infoUser.avatar,
        },
        sendAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        mess: [{ text: data.message, isLiked: false, isDisLiked: false }],
        replied_message: null,
        type: "text",
      };
      form.resetFields();
      setRepliedContainer(false);
      dispatch(sendMessage(tempMessage));
      dispatch(listRoomChatAsync({ idRoom }));
      socket.emit("sendMessageConversation", {
        room_id: idRoom,
        mess: data.message,
        user_name: infoUser.user_name,
        displayName: infoUser.display_name,
        avatarURL: infoUser.avatar,
        idUser: localStorage.getItem("access_token"),
        type: "text",
      });
    } else if (data.message && repliedMessage) {
      const feedbackMessage = {
        user: {
          user_name: infoUser.user_name,
          display_name: infoUser.display_name,
          avatar: infoUser.avatar,
        },
        sendAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        mess: [{ text: data.message, isLiked: false, isDisLiked: false }],
        replied_message: repliedMessage,
        type: "text",
      };
      const replyMessage = {
        idRoom: idRoom,
        idTextChat: idText,
        messageReply: data.message,
        idUser: localStorage.getItem("access_token"),
      };
      form.resetFields();
      setRepliedContainer(false);
      setRepliedMessage("");
      dispatch(sendRepliedMessage(feedbackMessage));
      dispatch(replyMessageAsync(replyMessage));
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const [form] = Form.useForm();

  return (
    <div className="spinning-ctn-conversation">
      <div className="chatbox">
        <div className="chatbox__content">
          {messages.length === 0 ? (
            <Title level={2}>Let's talk with your partner now!</Title>
          ) : (
            messages.map((message, index) => {
              if (message.type === "text") {
                return (
                  <BubbleChat
                    key={index}
                    bubbleChatIndex={index}
                    user={message.user}
                    sendAt={message.sendAt}
                    mess={message.mess}
                    replied_message={message.replied_message}
                    type={message.type}
                    socket={socket}
                    likeState={message.like ? message.like : []}
                    dislikeState={message.dislike ? message.dislike : []}
                    message={message}
                    handleClickReply={onClickReplyMessage}
                  />
                );
              } else if (message.type === "image")
                return (
                  <RenderImgMessage
                    key={index}
                    index={index}
                    user={message.user}
                    sendAt={message.sendAt}
                    mess={message.mess}
                    replied_message={message.replied_message}
                    type={message.type}
                    likeState={message.like && []}
                    dislikeState={message.dislike && []}
                    message={message}
                    handleClickReply={onClickReplyMessage}
                  />
                );
            })
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
              <Text style={{ color: "#fff", marginBottom: "0" }}>
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

          <Form.Item name="message" style={{ width: "100%" }}>
            <Input
              autocomplete="off"
              style={{ padding: "0.5rem" }}
              placeholder="Enter your message..."
              size="large"
              autoFocus
              suffix={
                <Space>
                  <Upload
                    name="image"
                    showUploadList={false}
                    customRequest={dummyRequest}
                    onChange={handleChangeUpload}
                    beforeUpload={beforeUpload}
                  >
                    <Tooltip title="Upload Picture">
                      <PictureOutlined className="hover-section" />
                    </Tooltip>
                  </Upload>

                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "2.5rem" }}
                  >
                    <SendOutlined />
                  </Button>
                </Space>
              }
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Chatbox;
