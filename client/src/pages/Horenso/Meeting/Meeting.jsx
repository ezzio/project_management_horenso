import React, { useState } from "react";
import Videocall from "../../../features/Videocall - Meeting/Videocall.js";
import "./Meeting.scss";
import "../../../styles/ContainerContents.scss";
import Header from "./components/Header";
const Meeting = () => {
  const [room, setRoom] = useState([]);

  return (
    <div className="ctn meeting">
      <Header />
      {room.length >= 1 ? (
        <div className="meeting__workplace">
          <div className="meeting__workplace__room"></div>
        </div>
      ) : (
        <div className="meeting__creator">
          <h1>Hiện tại dự án chưa có cuộc họp nào.</h1>
          <p>
            Để bất đầu cuộc hợp mới nhấp vào <b>Cuộc họp họp mới</b>
          </p>
        </div>
      )}
    </div>
  );
};

export default Meeting;
