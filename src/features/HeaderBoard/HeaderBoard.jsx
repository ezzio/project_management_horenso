import React from 'react';
import PropTypes from 'prop-types';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineCalendar, AiOutlineMore } from 'react-icons/ai';
import { UserOutlined } from '@ant-design/icons';

import './HeaderBoard.scss';
import { Avatar, Space, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';

const HeaderBoard = (props) => {
  const { title, startTime, endTime, members } = props;
  const history = useHistory();
  return (
    <div className="header-board">
      <BiArrowBack
        style={{ fontSize: '1.15rem', cursor: 'pointer' }}
        onClick={() => {
          history.goBack();
        }}
      />
      <div className="header-board__2nd">
        <div style={{ width: '70%', lineHeight: '1.5' }}>
          <div className="header-board__2nd__title">
            <h2>{title}</h2>
            <Space className="header-board__2nd__title__time">
              <AiOutlineCalendar />
              {startTime} <ArrowRightOutlined /> {endTime}
            </Space>
          </div>
        </div>
        <div
          style={{
            width: '20%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Avatar.Group
            maxCount={5}
            maxPopoverTrigger="click"
            size="large"
            maxStyle={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
              cursor: 'pointer',
            }}
          >
            {members.length > 0 &&
              members.map((member, index) => {
                return (
                  <Tooltip
                    title={member.display_name || member.user_name}
                    placement="top"
                  >
                    <Avatar src={member.avatar} icon={<UserOutlined />} />
                  </Tooltip>
                );
              })}
          </Avatar.Group>
        </div>
      </div>
    </div>
  );
};

HeaderBoard.propTypes = {
  title: PropTypes.string,
  members: PropTypes.array,
  status: PropTypes.string,
  level: PropTypes.string,
  endTime: PropTypes.string,
  startTime: PropTypes.string,
};

export default HeaderBoard;
