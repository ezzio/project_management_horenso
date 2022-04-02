import { Avatar, Comment, Dropdown, Image, Menu, Tooltip, Popover } from "antd";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  CommentOutlined,
  LikeTwoTone,
  DislikeTwoTone,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  messageReactionDisLike,
  messageReactionLike,
  reactionMessage,
} from "features/ChatBox/ChatBoxSlice";

const BubbleChat = (props) => {
  const dispatch = useDispatch();
  const {
    user,
    mess,
    sendAt,
    handleClickReply,
    replied_message,
    message,
    socket,
    likeState,
    dislikeState,
    bubbleChatIndex,
  } = props;
  const [action, setAction] = useState(null);
  const { idRoom } = useParams();

  useEffect(() => {
    socket.on("chat-likeInConversation", (infoLiked, bubbleChatIndex) => {
      dispatch(
        messageReactionLike({
          infoLiked,
          bubbleChatIndex,
        })
      );
    });
    socket.on(
      "chat-dislikeOutConversation",
      (bubbleChatIndex, infoDisLiked) => {
        dispatch(messageReactionDisLike({ bubbleChatIndex, infoDisLiked }));
      }
    );
    socket.on("chat-someOneLikeInConversation", (data) => {

    });
  }, []);

  const like = (item, index) => {
    const infoLiked = {
      idTextChat: item.idTextChat,
      type: "like",
      idRoom: idRoom,
      user_name: sessionStorage.getItem("user_name"),
      idUser: localStorage.getItem("access_token"),
    };
    socket.emit("chat-likeMessageInConversation", {
      idRoom,
      user_name: sessionStorage.getItem("user_name"),
    });
    // dispatch(reactionMessage(infoLiked));
  };

  const dislike = (item, index) => {
    setAction("disliked");
    const infoDisLiked = {
      idTextChat: item.idTextChat,
      type: "dislike",
      idRoom: idRoom,
      idUser: localStorage.getItem("access_token"),
      user_name: sessionStorage.getItem("user_name"),
    };
    dispatch(
      messageReactionDisLike({ item, index, bubbleChatIndex, infoDisLiked })
    );
    socket.emit("chat-dislikeMessageInConversation", {
      idRoom,
      user_name: sessionStorage.getItem("user_name"),
    });
    dispatch(reactionMessage(infoDisLiked));
  };

  const reduceLikeAndDislike = (arr) => {
    let reduceArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (reduceArray.length === 0) {
        reduceArray.push({ user_name: arr[i].user_name, count: 1 });
      } else {
        if (arr[i].user_name == reduceArray[reduceArray.length - 1].user_name) {
          reduceArray[reduceArray.length - 1].count++;
        } else {
          reduceArray.push({ user_name: arr[i].user_name, count: 1 });
        }
      }
    }

    return reduceArray;
  };

  const contentLike = (
    <div>
      {likeState.length > 0 &&
        reduceLikeAndDislike(likeState).map((item) => {
          return <p>{item.count + " " + item.user_name}</p>;
        })}
    </div>
  );

  const contentDislike = (
    <div>
      {dislikeState.length > 0 &&
        reduceLikeAndDislike(dislikeState).map((item) => {
          return <p>{item.count + " " + item.user_name}</p>;
        })}
    </div>
  );

  return (
    <>
      {replied_message?.length > 0 ? (
        <div className="render-replied-message" style={{ opacity: "0.3" }}>
          replied: {replied_message}
        </div>
      ) : null}
      <Comment
        author={<Text>{user.user_name}</Text>}
        avatar={<Avatar src={user.avatar} alt={user.user_name} />}
        content={mess.map((item, index) => (
          <>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item
                    key="1"
                    onClick={() => handleClickReply(item.text, item.idTextChat)}
                  >
                    <CommentOutlined style={{ marginRight: "0.3rem" }} />
                    Reply to
                  </Menu.Item>
                  <Menu.Item key="2" onClick={() => like(item, index)}>
                    {action === "liked" ? (
                      <LikeFilled style={{ marginRight: "0.3rem" }} />
                    ) : (
                      <LikeOutlined style={{ marginRight: "0.3rem" }} />
                    )}
                    Like
                  </Menu.Item>
                  <Menu.Item key="3" onClick={() => dislike(item, index)}>
                    {action === "disliked" ? (
                      <DislikeFilled style={{ marginRight: "0.3rem" }} />
                    ) : (
                      <DislikeOutlined style={{ marginRight: "0.3rem" }} />
                    )}
                    Dislike
                  </Menu.Item>
                </Menu>
              }
              trigger={["contextMenu"]}
            >
              <Text key={index} className="text-container">
                {item.text}{" "}
                <div className="" style={{ display: "flex" }}>
                  {likeState.length > 0 && (
                    <span
                      style={{
                        marginRight: "0.2rem",
                        borderRadius: "3px",
                        width: "fit-content",
                      }}
                    >
                      <Popover content={contentLike} title="Like">
                        <div
                          style={{
                            display: "flex",
                            gap: "6px",
                            padding: "0 6px",
                            border: " 1px solid blue",
                            borderRadius: "3px",
                            backgroundColor: "#b3e6ff",
                          }}
                        >
                          <LikeTwoTone
                            style={{
                              fontSize: "1rem",
                              marginTop: "0.1rem",
                            }}
                          />
                          <span>{likeState.length}</span>
                        </div>
                      </Popover>
                    </span>
                  )}
                  {dislikeState.length > 0 && (
                    <span>
                      <Popover content={contentDislike} title="dislike">
                        <div
                          style={{
                            display: "flex",
                            gap: "6px",
                            padding: "0 6px",
                            border: " 1px solid blue",
                            borderRadius: "3px",
                            backgroundColor: "#b3e6ff",
                          }}
                        >
                          <DislikeTwoTone
                            style={{
                              fontSize: "1rem",
                              marginRight: "0.2rem",
                              marginTop: "0.2rem",
                            }}
                          />
                          <span>{dislikeState.length}</span>
                        </div>
                      </Popover>
                    </span>
                  )}
                </div>
              </Text>
            </Dropdown>
          </>
        ))}
        datetime={
          <Tooltip title={moment(sendAt).format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment(sendAt).fromNow()}</span>
          </Tooltip>
        }
      />
    </>
  );
};

export default BubbleChat;
