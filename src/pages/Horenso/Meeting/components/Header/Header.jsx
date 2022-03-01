import React from "react";
import { AiFillSetting } from "react-icons/ai";
import "./Header.scss";
import propTypes from "prop-types";
import { SiGooglehangoutsmeet } from "react-icons/si";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";

const Header = ({ room, setIsModalVisible }) => {
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
        { 
          room.length > 0 && 
          <AiOutlineVideoCameraAdd className="icon" 
            onClick={() => setIsModalVisible(true)}
          />
        }
        <AiFillSetting className="icon" />
      </div>
    </div>
  );
};
Header.propTypes = {
  room: propTypes.array,
};
export default Header;
