import { Avatar, Comment, Dropdown, Menu, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import moment from 'moment';
import React, { createElement, useState } from 'react';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  CommentOutlined,
} from '@ant-design/icons';

const BubbleChat = (props) => {
  const { user, mess, sendAt, index, message } = props;
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

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

  const handleClickReply = () => {
    console.log(mess);
  };

  const menu = (
    <Menu>
      {/* <Menu.Item key="1">
        <LikeOutlined style={{ marginRight: '0.3rem' }} /> Like
      </Menu.Item>
      <Menu.Item key="2">
        <DislikeOutlined style={{ marginRight: '0.3rem' }} />
        Dislike
      </Menu.Item> */}
      <Menu.Item key="1" onClick={handleClickReply}>
        <CommentOutlined style={{ marginRight: '0.3rem' }} />
        Reply to
      </Menu.Item>
    </Menu>
  );

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === 'disliked' ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    // <span key="comment-basic-reply-to">Reply to</span>,
  ];
  return (
    <Comment
      actions={actions}
      author={<Text>{user.user_name}</Text>}
      avatar={<Avatar src={user.avatar} alt={user.user_name} />}
      content={mess.map((item, index) => (
        <>
          <Dropdown overlay={menu} trigger={['contextMenu']}>
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
  );
};

export default BubbleChat;
