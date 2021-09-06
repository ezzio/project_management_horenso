import React, { useState } from "react";
import PropTypes from "prop-types";
import Repositories from "./Component/Repositories/Repositories";
import Overview from "./Component/Overview/Overview";
import { MdPeople } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FiBookOpen } from 'react-icons/fi'
import { BiBookBookmark } from 'react-icons/bi'
import { AiOutlineExclamationCircle } from  'react-icons/ai'
import "./UserSetting.scss";

const UserSetting = (props) => {
  const userInfo = {
    id_user: null,
    username: "",
    password: "",
  };

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [selectButton, setSelectButton] = useState(1)

  const pageButtonClick = (n) => {
    setSelectButton(n)
    console.log('Button' + n)
  }


  return (
    <div>
      <div className='navBar'>
        <div className='navBar__btn-ctn'>
          <button onClick={() => pageButtonClick(1)} className={(selectButton === 1) ? 'navBar__overview-selected' : 'navBar__overview'}>
            <FiBookOpen style={(selectButton === 1) ? 
            {fontSize: 17, position: "absolute", right: 80, color: 'black'} :
            {fontSize: 17, position: "absolute", right: 80, color: 'gray'}} 
            />
            <span className={(selectButton === 1) ? 'navBar__overview-selected__text' : 'navBar__overview__text'}>Overview</span>
          </button>
          <button onClick={() => pageButtonClick(2)} className={(selectButton === 2) ? 'navBar__repo-selected' : 'navBar__repo'}>
            <BiBookBookmark style={(selectButton === 2) ? 
            {fontSize: 17, position: "absolute", left: 15, color: 'black'} :
            {fontSize: 17, position: "absolute", left: 15, color: 'gray'}} 
            />
            <span className={(selectButton === 2) ? 'navBar__repo-selected__text' : 'navBar__repo__text'}>Repositories</span>
            <div className='navBar__repo-number-ctn'>
              <span className='navBar__repo-number-ctn__text'>2</span>
            </div>
          </button>
          <button onClick={() => pageButtonClick(3)} className={(selectButton === 3) ?'navBar__issues-selected' : 'navBar__issues'}>
            <AiOutlineExclamationCircle style={(selectButton === 3) ? 
            {fontSize: 17, position: "absolute", left: 15, color: 'black'} :
            {fontSize: 17, position: "absolute", left: 15, color: 'gray'}} />
            <span className={(selectButton === 3) ?'navBar__issues-selected__text' : 'navBar__issues__text'}>Issues</span>
          </button>    
        </div>
      </div>
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
      <div className='info-ctn'>
        {
          (selectButton === 1) ? <Overview /> : 
          (selectButton === 2) ? <Repositories /> : ''
        }
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

