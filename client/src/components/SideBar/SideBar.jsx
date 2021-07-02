import React, { useRef, useState } from "react";
import "./SideBar.scss";
import { Link } from "react-router-dom";
import { SiGooglehangoutsmeet } from "react-icons/si";
import { BsFillKanbanFill, BsFillChatDotsFill } from "react-icons/bs";
import { AiFillGithub, AiFillSignal, AiFillDatabase } from "react-icons/ai";

const SideBar = () => {
  const [isSelected, setIsSelected] = useState(false);
  const targetSelect = useRef();
  const toggleSelected = (e) => {
    if (targetSelect.current) {
      targetSelect.current.className = "selectors__select__direct";
    }

    targetSelect.current = e.target;
    e.target.className = "selectors__select__direct active";
  };

  return (
    <div className="ctn-side-bar">
      <section className="logo">
        <h1>Kanso</h1>
      </section>
      <section className="user">
        <img
          src="https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.6435-9/83162431_1059481474384512_829843550521786368_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=BBNtA7XUq3wAX9w0eb5&_nc_ht=scontent.fsgn8-1.fna&oh=c38b0b10530a46340cdb1c7ded257ada&oe=60DFC235"
          alt=""
          height="50"
          width="50"
        />
        <b>Jack William</b>
        <p>/Tester</p>
      </section>
      <section className="selectors">
        <div className="selectors">
          <h5 className="selectors__title">KANBAN</h5>
          <ul className="selectors__select">
            <li>
              <Link
                to="/kanban"
                className="selectors__select__direct"
                onClick={(e) => {
                  toggleSelected(e);
                }}
              >
                <BsFillKanbanFill className="icon" />
                <p>Quản lý công việc</p>
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => {
                  toggleSelected(e);
                }}
                to="/document"
                className="selectors__select__direct"
              >
                <AiFillDatabase className="icon" />
                <p>Lưu trữ tài nguyên</p>
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => {
                  toggleSelected(e);
                }}
                to="/github"
                className="selectors__select__direct"
              >
                <AiFillGithub className="icon" />
                <p>Quản lý Github</p>
              </Link>
            </li>
          </ul>
        </div>

        <div className="selectors">
          <h5 className="selectors__title">HORENSO</h5>
          <ul className="selectors__select">
            <li>
              <Link
                onClick={(e) => {
                  toggleSelected(e);
                }}
                to="/report"
                className="selectors__select__direct"
              >
                <AiFillSignal className="icon" />
                <p>Báo cáo</p>
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => {
                  toggleSelected(e);
                }}
                to="/chat"
                className="selectors__select__direct"
              >
                <BsFillChatDotsFill className="icon" />
                <p>Trao đổi</p>
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => {
                  toggleSelected(e);
                }}
                to="/meeting"
                className="selectors__select__direct"
              >
                <SiGooglehangoutsmeet className="icon" />
                <p>Cuộc họp</p>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="work-progress">
        <b>Work progress</b>
        <p>Last updated by Ezzio</p>
        <p>09:12 AM : 08/11/2020</p>

        <div className="work-progress__ctn-bar">
          <div
            className="work-progress__ctn-bar__loading"
            style={{ width: "32%" }}
          >
            <p className="work-progress__ctn-bar__loading__count">32%</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SideBar;
