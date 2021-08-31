import React, { useRef, useState } from 'react';
import './SideBar.scss';
import { Link, useLocation } from 'react-router-dom';
import { SiGooglehangoutsmeet } from 'react-icons/si';
import {
  BsFillKanbanFill,
  BsFillChatDotsFill,
  BsThreeDots,
} from 'react-icons/bs';
import {
  AiFillGithub,
  AiFillSetting,
  AiFillSignal,
  AiFillDatabase,
} from 'react-icons/ai';
import { GiFlowerTwirl } from 'react-icons/gi';
import { RiTeamFill } from 'react-icons/ri';
import { MdDashboard } from 'react-icons/md';
const SideBar = () => {
  const mouseEnter = () => {
    setTimeout(() => {
      let hiddenElement = document.querySelectorAll('.hidden');
      for (var i = 0, len = hiddenElement.length; i < len; i++) {
        hiddenElement[i].style.display = 'block';
      }
    }, 100);
  };
  const mouseLeave = () => {
    setTimeout(() => {
      let hiddenElement = document.querySelectorAll('.hidden');
      for (var i = 0, len = hiddenElement.length; i < len; i++) {
        hiddenElement[i].style.display = 'none';
      }
    }, 100);
  };

  const location = useLocation();
  const currentUrl = location.pathname.slice(1);

  return (
    <div
      className="side-bar ctn-side-bar"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div className="side-bar__header">
        <p className="hidden">Kanso</p>
      </div>
      <div className="side-bar__content">
        <div className="side-bar__content__group">
          {currentUrl === 'dashboard' ? (
            <Link to="/dashboard" className="sidebar-active">
              <MdDashboard className="icon" />{' '}
              <p className="hidden">Dashboard</p>
            </Link>
          ) : (
            <Link to="/dashboard">
              <MdDashboard className="icon" />{' '}
              <p className="hidden">Dashboard</p>
            </Link>
          )}
          {currentUrl === 'kanban' ? (
            <Link className="sidebar-active" to="/kanban">
              <BsFillKanbanFill className="icon" />{' '}
              <p className="hidden">Table</p>
            </Link>
          ) : (
            <Link to="/kanban">
              <BsFillKanbanFill className="icon" />{' '}
              <p className="hidden">Table</p>
            </Link>
          )}

          {currentUrl === 'source' ? (
            <Link className="sidebar-active" to="/source">
              <AiFillDatabase className="icon" />{' '}
              <p className="hidden">Storage</p>
            </Link>
          ) : (
            <Link to="/source">
              <AiFillDatabase className="icon" />{' '}
              <p className="hidden">Storage</p>
            </Link>
          )}

          {currentUrl === 'github' ? (
            <Link className="sidebar-active" to="/github">
              <AiFillGithub className="icon" /> <p className="hidden">Github</p>
            </Link>
          ) : (
            <Link to="/github">
              <AiFillGithub className="icon" /> <p className="hidden">Github</p>
            </Link>
          )}
        </div>
        <div className="side-bar__content__group">
          {currentUrl === 'meeting' ? (
            <Link className="sidebar-active" to="/meeting">
              <SiGooglehangoutsmeet className="icon" />{' '}
              <p className="hidden">Meeting</p>
              <div className="notify hidden">
                <p>2</p>
              </div>
            </Link>
          ) : (
            <Link to="/meeting">
              <SiGooglehangoutsmeet className="icon" />{' '}
              <p className="hidden">Meeting</p>
              <div className="notify hidden">
                <p>2</p>
              </div>
            </Link>
          )}

          {currentUrl === 'conversation' ? (
            <Link className="sidebar-active" to="/conversation">
              <BsFillChatDotsFill className="icon" />{' '}
              <p className="hidden">Conversation</p>
              <div className="notify hidden">
                <p>9+</p>
              </div>
            </Link>
          ) : (
            <Link to="/conversation">
              <BsFillChatDotsFill className="icon" />{' '}
              <p className="hidden">Conversation</p>
              <div className="notify hidden">
                <p>9+</p>
              </div>
            </Link>
          )}

          {currentUrl === 'report' ? (
            <Link className="sidebar-active" to="/report">
              <AiFillSignal className="icon" />{' '}
              <p className="hidden">Reports</p>
            </Link>
          ) : (
            <Link to="/report">
              <AiFillSignal className="icon" />{' '}
              <p className="hidden">Reports</p>
            </Link>
          )}
        </div>
        <div className="side-bar__content__group">
          {currentUrl === 'team-mate' ? (
            <Link className="sidebar-active" to="/team-mate">
              <RiTeamFill className="icon" /> <p className="hidden">Teammate</p>
            </Link>
          ) : (
            <Link to="/team-mate">
              <RiTeamFill className="icon" /> <p className="hidden">Teammate</p>
            </Link>
          )}

          {currentUrl === 'setting' ? (
            <Link className="sidebar-active" to="/setting">
              <AiFillSetting className="icon" />{' '}
              <p className="hidden">Setting</p>
            </Link>
          ) : (
            <Link to="/setting">
              <AiFillSetting className="icon" />{' '}
              <p className="hidden">Setting</p>
            </Link>
          )}
        </div>
      </div>
      <div className="side-bar__footer">
        <div className="side-bar__footer__user">
          <img
            src="https://scontent.fvca1-2.fna.fbcdn.net/v/t1.6435-9/212452707_4456077581098268_8477389473127673076_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=730e14&_nc_ohc=wy6_kQ6FPbsAX9RSQc6&tn=LRtYXF1z3QKLRooO&_nc_ht=scontent.fvca1-2.fna&oh=436e8235103f3149b0fd762fb9309efd&oe=60F0088B"
            alt=""
            height="40"
            width="40"
          />
          <p className="hidden">Duong Dang Khoa</p>
        </div>
        <BsThreeDots className="icon hidden" />
      </div>
    </div>
  );
};

export default SideBar;
