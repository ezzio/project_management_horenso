import React, { useState } from "react";
import PropTypes from "prop-types";
import { MdPeople } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import "./UserSetting.scss";

const UserSetting = (props) => {
  const userInfo = {
    id_user: null,
    username: "",
    password: "",
  };

  const [isEditProfile, setIsEditProfile] = useState(false);

  return (
    <div className="ctn-userinfo">
      <div className="userinfo__sidebar">
        <div className="userinfo__sidebar__name">
          <img
            src="https://avatars.githubusercontent.com/u/72656184?v=4"
            alt="userimg"
            height="250"
            width="250"
            className="user-image"
          />
          <p className="name" style={{ color: "black" }}>
            Nguyên Đặng (Jimmy)
          </p>
          <p className="user-name">nguyendang127</p>
        </div>
        {isEditProfile ? (
          <EditProfile />
        ) : (
          <InfoProfile setIsEditProfile={() => setIsEditProfile(true)} />
        )}
      </div>
    </div>
  );
};

UserSetting.propTypes = {};

export default UserSetting;

const InfoProfile = ({ setIsEditProfile }) => {
  return (
    <>
      <div className="userinfo__sidebar__bio">
        <p className="userinfo__sidebar__bio__content">Contact me</p>
        <p className="userinfo__sidebar__bio__email">
          phunguyen.dang.ctc@gmail.com
        </p>
        <p className="userinfo__sidebar__bio__telephone">(+84) 907801311</p>
        <button className="edit-profile" onClick={setIsEditProfile}>Edit profile</button>
      </div>
      <div className="userinfo__sidebar__footer">
        <section className="userinfo__sidebar__footer__status">
          <div className="statistic">
            <section className="followers">
              <MdPeople className="icon" />
              <p>followers</p>
              <p>1</p>
            </section>
            <section className="following">
              <p>following</p>
              <p>0</p>
            </section>
          </div>
          <section className="location">
            <GoLocation />
            <p>VietNam</p>
          </section>
        </section>
      </div>
    </>
  );
};

const EditProfile = () => {
  return (
    <form className="userinfo__sidebar__edit">
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" className="name" />
        <label htmlFor="bio">Bio</label>
        <textarea className="bio" />
        <label htmlFor="company"><HiOutlineOfficeBuilding /></label>
        <input type="text" className='company' />
      </form>
    </form>
  );
};
