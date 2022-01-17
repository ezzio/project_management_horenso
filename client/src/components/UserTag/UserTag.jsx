import React from 'react';
import PropTypes from 'prop-types';
import './UserTag.scss';
const UserTag = (props) => {
  const { srcImg, userName, createAt, role } = props;
  console.log(role);
  const renderRole = () => {
    switch (role) {
      case 'pm': {
        return (
          <div
            className="user__role"
            style={{ backgroundColor: 'hsl(22, 95%, 60%,0.1)' }}
          >
            <p style={{ color: 'hsl(22, 95%, 60%)', margin: 0 }}>Project Manager</p>
          </div>
        );
      }
      case 'dev': {
        return (
          <div
            className="user__role"
            style={{ backgroundColor: 'hsl(267, 66%, 54%, 0.1)' }}
          >
            <p style={{ color: 'hsl(267, 66%, 54%)', margin: 0 }}>Developer</p>
          </div>
        );
      }
      default:
        break;
    }
  };
  return (
    <div className="user">
      <img src={srcImg} alt="" height="40" width="40" />
      <div
        style={{ display: 'flex', flexDirection: 'column' }}
        className="user__info"
      >
        <p>{userName}</p>
        {createAt && <i style={{ display: 'block' }}>{createAt}</i>}
      </div>
      {renderRole()}
    </div>
  );
};

UserTag.propTypes = {
  srcImg: PropTypes.string,
  userName: PropTypes.string,
  createAt: PropTypes.string,
  role: PropTypes.string,
};

export default UserTag;
