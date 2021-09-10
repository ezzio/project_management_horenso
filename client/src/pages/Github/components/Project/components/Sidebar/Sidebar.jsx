import React from "react";
import "./Sidebar.scss";
import { AiOutlineSetting } from "react-icons/ai";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { VscSourceControl } from "react-icons/vsc";
import { DiCode } from "react-icons/di";

const Sidebar = () => {
  const items = document.querySelectorAll(".body__list__item");
  items.forEach(
    (item) =>
      (item.onclick = function () {
        items.forEach((itemActive) => itemActive.classList.remove("active"));
        item.classList.add("active");
      })
  );

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <DiCode className="icon" />
        <h3>Project name</h3>
      </div>
      <div className="sidebar__body">
        <div className="body__list">
          <a className="body__list__item" href="#">
            <VscSourceControl className="icon" />
            <p>Source</p>
          </a>

          <a className="body__list__item" href="#">
            <HiOutlineDocumentDownload className="icon" />
            <p>Download</p>
          </a>

          <a className="body__list__item" href="#">
            <AiOutlineSetting className="icon" />
            <p>Setting</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
