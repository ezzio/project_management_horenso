import React, { useState } from "react";
import Project from "./Component/Project/Project";
import Task from './Component/Task/Task'
import { Button } from 'antd'
// import PropTypes from "prop-types";
import './UserSetting.scss'
import { MdPeople } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GrAddCircle } from 'react-icons/gr'
import { BsGear } from 'react-icons/bs'
import { AiOutlineMail, AiOutlineLink, AiFillFacebook, AiOutlineFacebook } from  'react-icons/ai'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editProfile  } from "./UserSettingSlice";
import AvatarUpload from "./Component/AvatarUpload/AvatarUpload";

const UserSetting = () => {
  // const userInfo = {
  //   id_user: null,
  //   username: "",
  //   password: "",
  // };

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [visibleModalUpload, setVisibleModalUpload] = useState(false);

  const profile = useSelector((state) => state.userSetting)

  const exitEditProfile = () => {
    setIsEditProfile(false);
  }

  return (
    <div
      className='user-setting-ctn'
    >
      <div className='info-ctn'>
      <Button 
        type='default'
        size='large'
        icon={
        <GrAddCircle 
          style={{position: 'relative', fontSize: 20, top: 4, marginRight: 5}} 
        />}
        style={{
          position: 'relative',
          left: '1.5%',
          borderRadius: 10,
          boxShadow: "0px 5px 15px #00000059",
          fontWeight: 'bold'
        }}
      >
        Create Project
      </Button>
      <Button 
        type='text'
        size='large'
        icon={
        <BsGear 
          style={{position: 'relative', fontSize: 20, top: 4, marginRight: 5}} 
        />}
        style={{
          position: 'relative',
          left: '68.4%',
          borderRadius: 10,
          fontWeight: 'bold',
        }}
      >
        Setting
      </Button>
      </div>
      <div className='project-ctn'>
        <Project />
      </div>
      <div className='task-ctn'>
        <h2
          style={{fontWeight: 'bold'}}
        >
          Task
        </h2>
        <Task />
      </div>
      <div className="ctn-userinfo">
        <div className="userinfo__sidebar">
          <div className="userinfo__sidebar__name">
            <img
              src={profile.avatarURL}
              alt="userimg"
              height="250"
              width="250"
              className="user-image"
              onClick={() => setVisibleModalUpload(true)}
            />
          </div>
          {isEditProfile ? (
            <EditProfile exitEditProfile={() => exitEditProfile()} profile={profile}/>
          ) : (
            <InfoProfile setIsEditProfile={() => setIsEditProfile(true)} profile={profile}/>
          )}
        </div>
        <AvatarUpload visibleModalUpload={visibleModalUpload} setVisibleModalUpload={setVisibleModalUpload}/>
      </div>
    </div>
  );
};

UserSetting.propTypes = {};

export default UserSetting;

const InfoProfile = ({ setIsEditProfile, profile }) => {
  return (
    <>
      <div className="userinfo__sidebar__bio">
        <p className="name" style={{ color: "black" }}>
              {profile.name}
            </p>
        <p className="user-name">nguyendang127</p>
        <p className="userinfo__sidebar__bio__content">{profile.bio}</p>
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
          <span className="userinfo__sidebar__bio__location">
              {profile.company}
            </span>
        </div>
        <div>
            <GoLocation style={{position: "relative", top: 5,fontSize: 18, marginRight: 5}} />
            <span className="userinfo__sidebar__bio__location">
              {profile.location}
            </span>
        </div>
        <div>
          <AiOutlineMail style={{position: "relative", top: 5,fontSize: 18, marginRight: 5}}/>
          <span className="userinfo__sidebar__bio__email">
            {profile.email}
          </span>
        </div>
        <div>
          <AiOutlineLink style={{position: "relative", top: 5,fontSize: 18, marginRight: 5}} />
          <a href={profile.link} className="userinfo__sidebar__bio__email">

          </a>
        </div>
        <div>
          <AiOutlineFacebook style={{position: "relative", top: 5,fontSize: 18, marginRight: 5}} />
          <a href={profile.facebook} className="userinfo__sidebar__bio__email">
            {profile.facebook}
          </a>
        </div>
      </div>
    </>
  );
};

const EditProfile = ({ exitEditProfile, profile }) => {

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
  } = useForm();

  const handleEdit = (data) => {
    dispatch(editProfile(data));
    exitEditProfile();
  }

  return (
    <div>
      <form className='edit-profile-ctn' onSubmit={handleSubmit(handleEdit)}>
        <div className="edit-profile-ctn__name-ctn">
          <label htmlFor="name" className="edit-profile-ctn__name-ctn__label" >Name</label>
          <input type="text" placeholder='Name' defaultValue={profile.name}
            className="edit-profile-ctn__name-ctn__input" 
            {...register('name')}
          />
        </div>
        <div className="edit-profile-ctn__name-ctn__bio">
          <label htmlFor="bio" className="edit-profile-ctn__bio-ctn__label">Bio</label>
          <textarea name="bio" placeholder='Add a bio' defaultValue={profile.bio}
            className="edit-profile-ctn__bio-ctn__input" 
            {...register('bio')}
          />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="company"><HiOutlineOfficeBuilding style={{fontSize: 19}} /></label>
          <input type="text" name='company' defaultValue={profile.company}
            className="edit-profile-ctn__details-ctn__input" 
            {...register('company')}
          />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="location"><GoLocation style={{fontSize: 19}}/></label>
          <input  type="text" name='location' defaultValue={profile.location}
          className="edit-profile-ctn__details-ctn__input"  
          {...register('location')}
          />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="email"><AiOutlineMail style={{fontSize: 19}}/></label>
          <input  type="text" name='email' defaultValue={profile.email}
          className="edit-profile-ctn__details-ctn__input"
          {...register('email')}
          />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="link"><AiOutlineLink style={{fontSize: 19}}/></label>
          <input type="text" name='link' defaultValue={profile.link}
          className="edit-profile-ctn__details-ctn__input"
          {...register('link')}
          />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="facebook"><AiFillFacebook style={{fontSize: 19}}/></label>
          <input type="text" name='facebook' defaultValue={profile.facebook}
          className="edit-profile-ctn__details-ctn__input"
          {...register('facebook')}
          />
        </div>
        <div>
          <button className="edit-profile-ctn__save-profile-btn" type="submit">Save profile</button>
          <button className="edit-profile-ctn__cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};


