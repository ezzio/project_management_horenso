import React from "react";
import { AiFillSetting } from "react-icons/ai";
import "./Header.scss";
import { SiGooglehangoutsmeet } from "react-icons/si";
const Header = () => {
  return (
    <div className="header">
      <div className="header__title">
        <SiGooglehangoutsmeet className="icon" />
        <p>Sodan</p>
      </div>
      <div className="header__control">
        <div className="header__control__time-tracker">
          <p>2:14</p> <p>•</p> <p>Th5, 01/07/2021</p>
        </div>
        <AiFillSetting className="icon" />
      </div>
    </div>
  );
};

export default Header;
