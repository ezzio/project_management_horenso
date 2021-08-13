import React from 'react';
import PropTypes from 'prop-types';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineCalendar, AiOutlineSearch } from 'react-icons/ai';
import './HeaderBoard.scss';

const HeaderBoard = (props) => {
  const { title, level, startTime, endTime, status, members } = props;
  return (
    <div className="header-board">
      <div className="header-board__header">
        <div className="header-board__header__back">
          <BiArrowBack />
          <span>Back to Jobs</span>
        </div>
        <div className="header-board__header__search">
          <AiOutlineSearch />
          <input type="search" placeholder="search task ..." />
        </div>
      </div>
      <div className="header-board__content">
        <div className="header-board__content__1st">
          <div className="board-title">
            <h1 style={{ color: 'black' }}>{title}</h1>
            <div
              className={
                level === 'High'
                  ? 'board-level'
                  : level === 'Low'
                  ? 'board-level low'
                  : 'board-level medium'
              }
            >
              <p>{level}</p>
            </div>
          </div>
          <div className="board-time">
            <AiOutlineCalendar />
            <i>
              {startTime} - {endTime}
            </i>
          </div>
        </div>
        <div className="header-board__content__2nd">
          <div className="board__member">
            <p>MEMBERS</p>
            <div>
              {members.map((mem) => {
                return <img src={mem.avatar} alt="" height="40" width="40" />;
              })}

              {members.length > 5 && (
                <div className="more-member">
                  <p>+{members.length - 5}</p>
                </div>
              )}
            </div>
          </div>
          <div
            className={
              status !== 'Active' ? 'board__status completed' : 'board__status'
            }
          >
            <p>STATUS</p>
            <div>
              <p>{status}</p>
            </div>
          </div>
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
