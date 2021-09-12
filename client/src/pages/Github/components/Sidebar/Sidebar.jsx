import React from "react";
import "./Sidebar.scss";
import { AiOutlineSetting } from "react-icons/ai";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { VscSourceControl } from "react-icons/vsc";
import { DiCode } from "react-icons/di";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const items = document.querySelectorAll("Link");
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
          <Link to="/github/content" className="body__list__item">
            <VscSourceControl className="icon" />
            <p>Content</p>
          </Link>

          <Link to="/github/download" className="body__list__item">
            <HiOutlineDocumentDownload className="icon" />
            <p>Download</p>
          </Link>

          <Link to="/github/setting" className="body__list__item">
            <AiOutlineSetting className="icon" />
            <p>Setting</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
