import { Comment, Typography, Avatar, Tooltip } from 'antd';

import React from 'react';
import moment from 'moment';

const { Text } = Typography;
const BubbleChatOnTask = (props) => {
  const { key, user, sendAt, mess } = props;
  console.log(mess);
  return (
    <>
      <Comment
        key={key}
        author={<Text>{user.user_name}</Text>}
        avatar={<Avatar src={user.avatar} alt={user.user_name} />}
        content={mess.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
        datetime={
          <Tooltip title={moment(sendAt).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(sendAt).fromNow()}</span>
          </Tooltip>
        }
      ></Comment>
    </>
  );
};

export default BubbleChatOnTask;
