import { Avatar, Comment, Dropdown, Image, Menu, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import moment from 'moment';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  CommentOutlined,
  LikeTwoTone,
  DislikeTwoTone,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  messageReactionDisLike,
  messageReactionLike,
  reactionMessage,
} from 'features/ChatBox/ChatBoxSlice';

const BubbleChat = (props) => {
  const dispatch = useDispatch();
  const {
    user,
    mess,
    sendAt,
    handleClickReply,
    replied_message,
    message,
    bubbleChatIndex,
  } = props;
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const { idRoom } = useParams();

  const like = (item, index) => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
    const infoLiked = {
      idTextChat: item.idTextChat,
      type: 'like',
      idRoom: idRoom,
      idUser: localStorage.getItem('access_token'),
    };
    dispatch(
      messageReactionLike({
        item,
        index,
        bubbleChatIndex,
      })
    );
    dispatch(reactionMessage(infoLiked));
  };

  const dislike = (item, index) => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
    const infoDisLiked = {
      idTextChat: item.idTextChat,
      type: 'dislike',
      idRoom: idRoom,
      idUser: localStorage.getItem('access_token'),
    };
    dispatch(messageReactionDisLike({ item, index, bubbleChatIndex }));
    dispatch(reactionMessage(infoDisLiked));
  };

  return (
    <>
      {replied_message && (
        <div className="render-replied-message" style={{ opacity: '0.3' }}>
          replied: {replied_message}
        </div>
      )}
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
                    <CommentOutlined style={{ marginRight: '0.3rem' }} />
                    Reply to
                  </Menu.Item>
                  <Menu.Item key="2" onClick={() => like(item, index)}>
                    {action === 'liked' ? (
                      <LikeFilled style={{ marginRight: '0.3rem' }} />
                    ) : (
                      <LikeOutlined style={{ marginRight: '0.3rem' }} />
                    )}
                    Like
                  </Menu.Item>
                  <Menu.Item key="3" onClick={() => dislike(item, index)}>
                    {action === 'disliked' ? (
                      <DislikeFilled style={{ marginRight: '0.3rem' }} />
                    ) : (
                      <DislikeOutlined style={{ marginRight: '0.3rem' }} />
                    )}
                    Dislike
                  </Menu.Item>
                </Menu>
              }
              trigger={['contextMenu']}
            >
              <Text key={index} className="text-container">
                {item.text}{' '}
                {item.isLiked || item.isDisLiked ? (
                  <div className="text-container__reaction-container">
                    <span>
                      {item.isLiked === true && (
                        <>
                          <LikeTwoTone
                            style={{ fontSize: '1rem', marginRight: '0.2rem' }}
                          />
                          <span style={{ color: 'white' }}>{likes}</span>
                        </>
                      )}
                    </span>

                    <span>
                      {item.isDisLiked === true && (
                        <>
                          <DislikeTwoTone
                            style={{ fontSize: '1rem', marginRight: '0.2rem' }}
                          />
                          <span style={{ color: 'white' }}>{dislikes}</span>
                        </>
                      )}
                    </span>
                  </div>
                ) : null}
              </Text>
            </Dropdown>
          </>
        ))}
        datetime={
          <Tooltip title={moment(sendAt).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(sendAt).fromNow()}</span>
          </Tooltip>
        }
      />
    </>
  );
};

export default BubbleChat;
