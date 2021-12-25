import React, { useState, useEffect } from "react";
import Project from "./Component/Project/Project";
import Task from "./Component/Task/Task";
import { Button } from "antd";
import "./UserSetting.scss";
import { MdPeople } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import {
  AiOutlineMail,
  AiOutlineLink,
  AiFillFacebook,
  AiOutlineFacebook,
} from "react-icons/ai";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, listUserInfo } from "./UserSettingSlice";
import AvatarUpload from "./Component/AvatarUpload/AvatarUpload";

const UserSetting = () => {
  // const userInfo = {
  //   id_user: null,
  //   username: "",
  //   password: "",
  // };
  const dispatch = useDispatch();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [visibleModalUpload, setVisibleModalUpload] = useState(false);

  const profile = useSelector((state) => state.userSetting);
  console.log(profile);
  const exitEditProfile = () => {
    setIsEditProfile(false);
  };

  useEffect(() => {
    dispatch(listUserInfo())
  }, []);

  return (
    <div className="user-setting-ctn">
      <div className="info-ctn">
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          style={{ borderRadius: "5px" }}
        >
          Create Project
        </Button>
      </div>
      <div className="project-ctn">
        <Project />
      </div>
      <div className="task-ctn">
        <h2 style={{ fontWeight: "bold" }}>Task</h2>
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
            <EditProfile
              exitEditProfile={() => exitEditProfile()}
              profile={profile}
            />
          ) : (
            <InfoProfile
              setIsEditProfile={() => setIsEditProfile(true)}
              profile={profile}
            />
          )}
        </div>
        <AvatarUpload
          visibleModalUpload={visibleModalUpload}
          setVisibleModalUpload={setVisibleModalUpload}
        />
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
        <Button
          type="primary"
          size="medium"
          onClick={setIsEditProfile}
          style={{ marginBottom: "1rem", borderRadius: "5px" }}
        >
          Edit profile
        </Button>
        <div>
          <HiOutlineOfficeBuilding
            style={{ position: "relative", fontSize: 18, marginRight: 5 }}
          />
          <span className="userinfo__sidebar__bio__location">
            {profile.company}
          </span>
        </div>
        <div>
          <GoLocation
            style={{
              position: "relative",
              top: 5,
              fontSize: 18,
              marginRight: 5,
            }}
          />
          <span className="userinfo__sidebar__bio__location">
            {profile.location}
          </span>
        </div>
        <div>
          <AiOutlineMail
            style={{
              position: "relative",
              top: 5,
              fontSize: 18,
              marginRight: 5,
            }}
          />
          <span className="userinfo__sidebar__bio__email">{profile.email}</span>
        </div>
        <div>
          <AiOutlineLink
            style={{
              position: "relative",
              top: 5,
              fontSize: 18,
              marginRight: 5,
            }}
          />
          <a href={profile.link} className="userinfo__sidebar__bio__email"></a>
        </div>
        <div>
          <AiOutlineFacebook
            style={{
              position: "relative",
              top: 5,
              fontSize: 18,
              marginRight: 5,
            }}
          />
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

  const { register, handleSubmit } = useForm();

  const handleEdit = (data) => {
    dispatch(editProfile(data));
    exitEditProfile();
  };

  return (
    <div>
      <form className="edit-profile-ctn" onSubmit={handleSubmit(handleEdit)}>
        <div className="edit-profile-ctn__name-ctn">
          <label htmlFor="name" className="edit-profile-ctn__name-ctn__label">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            defaultValue={profile.name}
            className="edit-profile-ctn__name-ctn__input"
            {...register("name")}
          />
        </div>
        <div className="edit-profile-ctn__name-ctn__bio">
          <label htmlFor="bio" className="edit-profile-ctn__bio-ctn__label">
            Bio
          </label>
          <textarea
            name="bio"
            placeholder="Add a bio"
            defaultValue={profile.bio}
            className="edit-profile-ctn__bio-ctn__input"
            {...register("bio")}
          />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="company">
            <HiOutlineOfficeBuilding style={{ fontSize: 19 }} />
          </label>
          <input
            type="text"
            name="company"
            defaultValue={profile.company}
            className="edit-profile-ctn__details-ctn__input"
            {...register("company")}
          />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="location">
            <GoLocation style={{ fontSize: 19 }} />
          </label>
          <input
            type="text"
            name="location"
            defaultValue={profile.location}
            className="edit-profile-ctn__details-ctn__input"
            {...register("location")}
          />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="email">
            <AiOutlineMail style={{ fontSize: 19 }} />
          </label>
          <input
            type="text"
            name="email"
            defaultValue={profile.email}
            className="edit-profile-ctn__details-ctn__input"
            {...register("email")}
          />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="link">
            <AiOutlineLink style={{ fontSize: 19 }} />
          </label>
          <input
            type="text"
            name="link"
            defaultValue={profile.link}
            className="edit-profile-ctn__details-ctn__input"
            {...register("link")}
          />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="facebook">
            <AiFillFacebook style={{ fontSize: 19 }} />
          </label>
          <input
            type="text"
            name="facebook"
            defaultValue={profile.facebook}
            className="edit-profile-ctn__details-ctn__input"
            {...register("facebook")}
          />
        </div>
        <div>
          <button className="edit-profile-ctn__save-profile-btn" type="submit">
            Save profile
          </button>
          <button className="edit-profile-ctn__cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};
