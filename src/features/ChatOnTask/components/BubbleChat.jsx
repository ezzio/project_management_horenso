import { Avatar, Comment, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import moment from 'moment';
import React from 'react';

const BubbleChat = ({ user, mess, sendAt }) => {
  return (
    <Comment
      author={<Text>{user.user_name}</Text>}
      avatar={<Avatar src={user.avatar} alt={user.user_name} />}
      content={mess.map((item, index) => (
        <>
          <Text key={index}>{item}</Text>
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
