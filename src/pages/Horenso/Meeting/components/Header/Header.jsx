import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import './Header.scss';
import propTypes from 'prop-types';
import { SiGooglehangoutsmeet } from 'react-icons/si';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import moment from 'moment';
import { Typography } from 'antd';
import Clock from 'react-live-clock';

const { Title } = Typography;

const Header = ({ room, setIsModalVisible }) => {
  return (
    <div className="header">
      <div className="header__title">
        <SiGooglehangoutsmeet className="icon" />
        <p>Sodan</p>
      </div>
      <div className="header__control">
        <div className="header__control__time-tracker">
          <Title level={5} style={{ margin: '0px' }}>
            <Clock format={'MMMM Mo, YYYY • h:mm:ss A'} ticking={true} />
          </Title>
        </div>
        {room.length > 0 && (
          <AiOutlineVideoCameraAdd
            className="icon"
            onClick={() => setIsModalVisible(true)}
          />
        )}
      </div>
    </div>
  );
};
Header.propTypes = {
  room: propTypes.array,
};
export default Header;
