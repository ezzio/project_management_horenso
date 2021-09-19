import React from "react";
import "./Sidebar.scss";
import { AiOutlineSetting } from "react-icons/ai";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { VscSourceControl } from "react-icons/vsc";
import { DiCode } from "react-icons/di";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* <div className="sidebar__header"> */}
      <NavLink exact to="/github/content" className="sidebar__header">
        <DiCode className="icon" />
        <h3>Project name</h3>
      </NavLink>
      {/* </div> */}
      <div className="sidebar__body">
        <div className="body__list">
          <NavLink
            exact
            to="/github/content"
            className="body__list__item"
            activeClassName="body__list__item active"
          >
            <VscSourceControl className="icon" />
            <p>Content</p>
          </NavLink>

          <NavLink
            exact
            to="/github/download"
            className="body__list__item"
            activeClassName="body__list__item active"
          >
            <HiOutlineDocumentDownload className="icon" />
            <p>Download</p>
          </NavLink>

          <NavLink
            exact
            to="/github/setting"
            className="body__list__item"
            activeClassName="body__list__item active"
          >
            <AiOutlineSetting className="icon" />
            <p>Setting</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
