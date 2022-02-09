import React, { useState, useEffect } from 'react';
import Project from './Component/Project/Project';
import NoProject from './Component/Project/NoProject';
import Task from './Component/Task/Task';
import { Avatar, Button, Image, message, Spin, Tooltip, Upload } from 'antd';
import './UserSetting.scss';
import { GoLocation } from 'react-icons/go';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { AiOutlineMail } from 'react-icons/ai';
import { PlusOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, listUserInfo, editUserAsync } from './UserSettingSlice';
import { CameraOutlined, UserOutlined } from '@ant-design/icons';
import CreateProject from 'features/CreateProject/CreateProject';
import userApi from 'api/userApi';
import Header from './Component/Header/Header';

const UserSetting = () => {
  const dispatch = useDispatch();
  const [isEditProfile, setIsEditProfile] = useState(false);

  const profile = useSelector((state) => state.userSetting);

  const exitEditProfile = () => {
    setIsEditProfile(false);
  };

  useEffect(() => {
    dispatch(listUserInfo());
    localStorage.removeItem('projectowner');
  }, []);

  // ----------Upload avatar----------->
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUploadAvatar = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      message.error('Invalid file type or format');
    }
    if (!isLt2M) {
      message.error('File size must be smaller than 2MB');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChangeAvatar = (info) => {
    if (info.file.status === 'uploading') {
      setIsLoadingAvatar(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log(info);
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setIsLoadingAvatar(false);
        message.success('Upload avatar successful');
      });
    }
  };

  const uploadAvatar = ({ file, onSuccess }) => {
    let data = new FormData();
    data.append('file', file);
    data.append('owner', localStorage.getItem('access_token') || '');
    userApi.uploadAvatar(data);
    setTimeout(() => {
      onSuccess('ok');
    }, 500);
  };
  // <---------Upload avatar------------

  // ----------Create project----------->
  const [isModalCreateProject, setIsModalCreateProject] = useState(false);

  // <---------Create project------------

  const loading = useSelector((state) => state.userSetting.loading);
  const allTask = useSelector((state) => state.userSetting.allTask)

  return (
    <>
      <Header />
      <div className="user-setting-ctn">
        <CreateProject
          isModalVisible={isModalCreateProject}
          setIsModalVisible={setIsModalCreateProject}
        />

        <div className="task-and-project-ctn">
          <div className="info-ctn">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              style={{ borderRadius: '5px', top: 10, left: 15 }}
              onClick={() => setIsModalCreateProject(true)}
            >
              Create Project
            </Button>
            <div className="project-ctn">
              <Spin spinning={loading}>
                {profile.projects === undefined ||
                profile.projects.length === 0 ? (
                  <NoProject />
                ) : (
                  <Project />
                )}
              </Spin>
            </div>
          </div>
          <div className="task-ctn">
            <h2 style={{ fontWeight: 'bold' }}>Your tasks</h2>
            <Task allTask={allTask}/>
          </div>
        </div>
        <div className="ctn-userinfo">
          <div className="userinfo__sidebar">
            <div className="userinfo__sidebar__name">
              <Avatar
                icon={<UserOutlined />}
                src={
                  <Image
                    src={imageUrl || profile.avatarURL}
                    style={{ width: 256 }}
                    preview={false}
                  />
                }
                size={256}
              />
              <div style={{ position: 'absolute', bottom: '60%', right: '5%' }}>
                <Tooltip title="Upload avatar">
                  <Upload
                    onChange={handleChangeAvatar}
                    customRequest={uploadAvatar}
                    beforeUpload={beforeUploadAvatar}
                    name="avatar"
                    showUploadList={false}
                  >
                    <Button
                      shape="circle"
                      icon={<CameraOutlined />}
                      size="large"
                      loading={isLoadingAvatar}
                    />
                  </Upload>
                </Tooltip>
              </div>
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
        </div>
      </div>
    </>
  );
};

export default UserSetting;

const InfoProfile = ({ setIsEditProfile, profile }) => {
  return (
    <>
      <div className="userinfo__sidebar__bio">
        <p className="name" style={{ color: 'black' }}>
          {profile.name}
        </p>
        <p className="user-name">{profile.display_name}</p>
        <p className="userinfo__sidebar__bio__content">{profile.bio}</p>
        <Button
          type="primary"
          size="medium"
          onClick={setIsEditProfile}
          style={{ marginBottom: '1rem', borderRadius: '5px' }}
        >
          Edit profile
        </Button>
        <div>
          <Tooltip title="Company" placement="left">
            <HiOutlineOfficeBuilding
              style={{ position: 'relative', fontSize: 18, marginRight: 5 }}
            />
            <span className="userinfo__sidebar__bio__location">
              {profile.company}
            </span>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Address" placement="left">
            <GoLocation
              style={{
                position: 'relative',
                top: 5,
                fontSize: 18,
                marginRight: 5,
              }}
            />
            <span className="userinfo__sidebar__bio__location">
              {profile.location}
            </span>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Email" placement="left">
            <AiOutlineMail
              style={{
                position: 'relative',
                top: 5,
                fontSize: 18,
                marginRight: 5,
              }}
            />
            <span className="userinfo__sidebar__bio__email">
              {profile.email}
            </span>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

const EditProfile = ({ exitEditProfile, profile }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const handleEdit = (data) => {
    dispatch(editUserAsync(data));
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
            placeholder="display_name"
            defaultValue={profile.display_name}
            className="edit-profile-ctn__name-ctn__input"
            {...register('display_name')}
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
            {...register('bio')}
            maxLength={220}
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
            {...register('company')}
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
            {...register('location')}
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
            {...register('email')}
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
