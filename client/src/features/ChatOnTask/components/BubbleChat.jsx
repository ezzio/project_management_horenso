import { Avatar, Comment, Dropdown, Image, Menu, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import moment from 'moment';
import React, { useState } from 'react';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  CommentOutlined,
} from '@ant-design/icons';

const BubbleChat = (props) => {
  const {
    user,
    mess,
    sendAt,
    handleClickReply,
    replied_message,
    message,
    type,
  } = props;
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  console.log(message);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <span key="comment-basic-reply-to">Reply to: {replied_message}</span>,
  ];
  return (
    <>
      <Comment
        actions={replied_message ? actions : null}
        author={<Text>{user.user_name}</Text>}
        avatar={<Avatar src={user.avatar} alt={user.user_name} />}
        content={mess.map((item, index) => (
          <>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1" onClick={() => handleClickReply(item)}>
                    <CommentOutlined style={{ marginRight: '0.3rem' }} />
                    Reply to
                  </Menu.Item>
                  <Menu.Item key="2" onClick={like}>
                    {action === 'liked' ? (
                      <LikeFilled style={{ marginRight: '0.3rem' }} />
                    ) : (
                      <LikeOutlined style={{ marginRight: '0.3rem' }} />
                    )}
                    <Text style={{ marginRight: '0.3rem' }}>{likes}</Text>
                    Like
                  </Menu.Item>
                  <Menu.Item key="3" onClick={dislike}>
                    {action === 'disliked' ? (
                      <DislikeFilled style={{ marginRight: '0.3rem' }} />
                    ) : (
                      <DislikeOutlined style={{ marginRight: '0.3rem' }} />
                    )}
                    <Text style={{ marginRight: '0.3rem' }}>{dislikes}</Text>
                    Dislike
                  </Menu.Item>
                </Menu>
              }
              trigger={['contextMenu']}
            >
              <Text key={index}>{item}</Text>
            </Dropdown>
            <br />
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
