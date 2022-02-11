import React from 'react';
import PropTypes from 'prop-types';
import './ListMember.scss';
import { Avatar, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const ListMember = ({ members }) => {
  return (
    <div className="member-list">
      <Avatar.Group maxCount={5}>
        {members.map((member, index) => {
          return (
            <Tooltip title={member.user_name} placement="top">
              <Avatar
                style={{ backgroundColor: '#87d068' }}
                icon={<UserOutlined />}
                src={member.avatar}
              />
            </Tooltip>
          );
        })}
      </Avatar.Group>
    </div>
  );
};

ListMember.propTypes = {
  members: PropTypes.array,
};

export default ListMember;
