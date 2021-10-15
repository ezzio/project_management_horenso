import React, { useState } from "react";
// import PropTypes from "prop-types";
import Task from "./Component/Task/Task";
import Project from "./Component/Project/Project";
import Issues from "./Component/Issues/Issues";
import { MdPeople } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FiBookOpen } from 'react-icons/fi'
import { BiBookBookmark } from 'react-icons/bi'
import { AiOutlineExclamationCircle, AiOutlineMail, AiOutlineLink, AiFillFacebook, AiOutlineFacebook } from  'react-icons/ai'
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
          <button onClick={() => pageButtonClick(1)} className={(selectButton === 1) ? 'navBar__project-selected' : 'navBar__project'}>
            <FiBookOpen style={(selectButton === 1) ? 
            {fontSize: 20, position: "absolute", left: 15, bottom: 12, color: 'black'} :
            {fontSize: 20, position: "absolute", left: 15, bottom: 12, color: 'gray'}}
          />
            <span className={(selectButton === 1) ? 'navBar__project-selected__text' : 'navBar__project__text'}>Projects</span>
          </button>
          <button onClick={() => pageButtonClick(2)} className={(selectButton === 2) ? 'navBar__task-selected' : 'navBar__task'}>
            <BiBookBookmark style={(selectButton === 2) ? 
            {fontSize: 20, position: "absolute", left: 15, bottom: 12, color: 'black'} :
            {fontSize: 20, position: "absolute", left: 15, bottom: 12, color: 'gray'}} 
          />
            <span className={(selectButton === 2) ? 'navBar__task-selected__text' : 'navBar__task__text'}>Tasks</span>
            <div className='navBar__task-number-ctn'>
              <span className='navBar__task-number-ctn__text'>2</span>
            </div>
          </button>
          <button onClick={() => pageButtonClick(3)} className={(selectButton === 3) ?'navBar__issues-selected' : 'navBar__issues'}>
            <AiOutlineExclamationCircle style={(selectButton === 3) ? 
            {fontSize: 20, position: "absolute", left: 15, bottom: 12, color: 'black'} :
            {fontSize: 20, position: "absolute", left: 15, bottom: 12, color: 'gray'}} 
          />
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
          (selectButton === 1) ? <Project /> : 
          (selectButton === 2) ? <Task /> : 
          (selectButton === 3) ? <Issues /> : ''
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
        <p className="name" style={{ color: "black" }}>
              Nguyên Đặng (Jimmy)
            </p>
        <p className="user-name">nguyendang127</p>
        <p className="userinfo__sidebar__bio__content">Contact me</p>
        <button className="edit-profile" onClick={setIsEditProfile}>Edit profile</button>
        <div className="userinfo__sidebar__footer">
          <section className="userinfo__sidebar__footer__status">
            <div className="statistic">
              <section className="followers">
                <MdPeople style={{position: "relative",fontSize: 18, marginRight: 5}}/>
                <span>followers <span>1</span></span>  
              </section>
              <section className="following">
                <span>following <span>0</span></span>
              </section>
            </div>
          </section>
        </div>
        <div>
          <HiOutlineOfficeBuilding style={{position: "relative",fontSize: 18, marginRight: 5}} />
        </div>
        <div>
            <GoLocation style={{position: "relative", top: 5,fontSize: 18, marginRight: 5}} />
            <span className="userinfo__sidebar__bio__location">VietNam</span>
        </div>
        <div>
          <AiOutlineMail style={{position: "relative", top: 5,fontSize: 18, marginRight: 5}}/>
          <span className="userinfo__sidebar__bio__email">
            phunguyen.dang.ctc@gmail.com
          </span>
        </div>
        <div>
          <AiOutlineLink style={{position: "relative", top: 5,fontSize: 18, marginRight: 5}} />
        </div>
        <div>
          <AiOutlineFacebook style={{position: "relative", top: 5,fontSize: 18, marginRight: 5}} />
        </div>
      </div>
    </>
  );
};

const EditProfile = ({setIsEditProfile}) => {
  return (
    <div>
      <form className='edit-profile-ctn'>
        <div className="edit-profile-ctn__name-ctn">
          <label htmlFor="name" className="edit-profile-ctn__name-ctn__label" >Name</label>
          <input type="text" placeholder='Name'
          className="edit-profile-ctn__name-ctn__input" />
        </div>
        <div className="edit-profile-ctn__name-ctn__bio">
          <label htmlFor="bio" className="edit-profile-ctn__bio-ctn__label">Bio</label>
          <textarea className="bio" placeholder='Add a bio' 
          className="edit-profile-ctn__bio-ctn__input" />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="company"><HiOutlineOfficeBuilding style={{fontSize: 19}} /></label>
          <input className="edit-profile-ctn__details-ctn__input" type="text"  />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="Location"><GoLocation style={{fontSize: 19}}/></label>
          <input className="edit-profile-ctn__details-ctn__input" type="text"  />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="Location"><AiOutlineMail style={{fontSize: 19}}/></label>
          <input className="edit-profile-ctn__details-ctn__input" type="text"  />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="Location"><AiOutlineLink style={{fontSize: 19}}/></label>
          <input className="edit-profile-ctn__details-ctn__input" type="text"  />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="Location"><AiFillFacebook style={{fontSize: 19}}/></label>
          <input className="edit-profile-ctn__details-ctn__input" type="text"  />
        </div>
        <div>
          <button className="edit-profile-ctn__save-profile-btn" onClick={setIsEditProfile}>Save profile</button>
          <button className="edit-profile-ctn__cancel-btn" onClick={setIsEditProfile}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

