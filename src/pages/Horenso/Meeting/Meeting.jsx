import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Meeting.scss";
import "../../../styles/ContainerContents.scss";
import Header from "./components/Header/Header";
import Workplace from "./components/Workplace/Workplace.jsx";
import MeetingModal from "./components/Modal/MeetingModal";
import { Switch, Route, Link, useParams } from "react-router-dom";
import { listMeetingRoom } from "./MeetingSlice";
const Meeting = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { idProject } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listMeetingRoom({ idProject }));
  }, []);

  const room = useSelector((state) => state.meeting.meetingRooms);

  return (
    <div className="ctn meeting">
      <Header room={room} setIsModalVisible={setIsModalVisible} />
      <Workplace room={room} setIsModalVisible={setIsModalVisible} />
      <MeetingModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  );
};

export default Meeting;
