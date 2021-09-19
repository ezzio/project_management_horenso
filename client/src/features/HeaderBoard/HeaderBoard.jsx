import React from 'react';
import PropTypes from 'prop-types';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineCalendar, AiOutlineMore } from 'react-icons/ai';
import './HeaderBoard.scss';

const HeaderBoard = (props) => {
  const { title, level, startTime, endTime, status, members } = props;
  return (
    <div className="header-board">
      <BiArrowBack style={{ fontSize: '1.15rem' }} />
      <div className="header-board__2nd">
        <div style={{ width: '70%', lineHeight: '1.5' }}>
          <div className="header-board__2nd__title">
            <h2>
              Well organized and easy to understand Web building tutorials with
              lots of examples of how to use HTML, CSS, JavaScript, SQL, Python,
              PHP, Bootstrap, Java, XML and more.
            </h2>
            <div className="header-board__2nd__title__time">
              <AiOutlineCalendar />
              {startTime} - {endTime}
            </div>
          </div>
        </div>
        <div
          style={{
            width: '20%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            className={
              level === 'High' ? 'high' : level === 'Medium' ? 'medium' : 'low'
            }
          >
            {level}
          </div>
          <div className="header-board__2nd__members">
            {members.map((member, index) => {
              return index < 4 ? (
                <img src={member.avatar} alt="avatar" height="40" width="40" />
              ) : (
                <div className="header-board__2nd__members__more">
                  <p>+{members.length - 4}</p>
                </div>
              );
            })}
          </div>
          <AiOutlineMore className="header-board__2nd__setting" />
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
