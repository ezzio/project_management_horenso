import React from 'react';
import PropTypes from 'prop-types';
import './ListMember.scss';
import { Avatar, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ModalCheckProfileMember from 'features/ModalCheckProfileMember/ModalCheckProfileMember';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { viewMemberInfo } from 'features/ModalCheckProfileMember/CheckProfileMemberSlice';

const ListMember = ({ members }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const viewProfile = (item) => {
    setUserName(item);
    setVisible(true);
    dispatch(viewMemberInfo(item));
  };

  return (
    <div className="member-list">
      {visible && (
        <ModalCheckProfileMember visible={true} setVisible={setVisible} />
      )}
      <Avatar.Group maxCount={5}>
        {members.map((member, index) => {
          return (
            <Tooltip title={member.user_name} placement="top">
              <Avatar
                style={{ backgroundColor: '#87d068', cursor: 'pointer' }}
                icon={<UserOutlined />}
                src={member.avatar}
                onClick={() => viewProfile(member.user_name)}
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
