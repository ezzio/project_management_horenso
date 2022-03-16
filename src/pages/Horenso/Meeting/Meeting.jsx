import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Meeting.scss";
import "../../../styles/ContainerContents.scss";
import Header from "./components/Header/Header";
import Workplace from "./components/Workplace/Workplace.jsx";
import MeetingModal from "./components/Modal/MeetingModal";
import { listUserInfo } from "pages/UserSettings/UserSettingSlice";
import { Switch, Route, Link, useParams } from "react-router-dom";
import { listMeetingRoom } from "./MeetingSlice";
import { Spin } from "antd";
const Meeting = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { idProject } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUserInfo());
    dispatch(listMeetingRoom({ idProject }));
  }, []);
  const room = useSelector((state) => state.meeting.meetingRooms);
  const loadding = useSelector((state) => state.meeting.loading);

  return (
    <div className="ctn meeting">
      <Spin spinning={loadding}>
        <Header room={room} setIsModalVisible={setIsModalVisible} />
        <Workplace room={room} setIsModalVisible={setIsModalVisible} />
        <MeetingModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </Spin>
    </div>
  );
};

export default Meeting;
