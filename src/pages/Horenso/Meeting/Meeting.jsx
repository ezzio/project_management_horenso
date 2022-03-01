import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Meeting.scss';
import '../../../styles/ContainerContents.scss';
import Header from './components/Header/Header';
import Workplace from './components/Workplace/Workplace.jsx';
import MeetingModal from './components/Modal/MeetingModal';
import { Switch, Route, Link, useParams } from 'react-router-dom';
const Meeting = () => {

  const [isModalVisible, setIsModalVisible] = useState(false)

  const room = useSelector((state) => state.meeting.meetingRooms)

  const { idProject } = useParams();
  console.log(idProject);

  return (
    <div className="ctn meeting">
      <Header room={room} setIsModalVisible={setIsModalVisible}/>
      <Workplace room={room} setIsModalVisible={setIsModalVisible}/>
      <MeetingModal
        isModalVisible={isModalVisible} 
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  );
};

export default Meeting;
