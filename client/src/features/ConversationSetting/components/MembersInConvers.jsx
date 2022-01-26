import { Avatar, Badge, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;
const MembersInConvers = (props) => {
  const { user_displayName, avatarUrl, is_online } = props;
  return (
    <>
      <Badge
        dot="true"
        status={is_online === true ? 'success' : 'default'}
        offset={[-5, 5]}
      >
        <Avatar size="large" src={avatarUrl} alt="Han Solo" />
      </Badge>
      <Text style={{ marginLeft: '1rem' }} className="user-display-name">
        {user_displayName}
      </Text>
    </>
  );
};

export default MembersInConvers;
