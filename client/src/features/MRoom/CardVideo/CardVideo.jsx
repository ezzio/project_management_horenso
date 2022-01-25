import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
// import { selectuserInRoom } from 'pages/Room/RoomSlice';

const CardVideo = ({ connectionPeerjs, CallTo, nameId, MyVideoCall }) => {
  const MyVideo = useRef();

  useEffect(() => {
    try {
      let videoGird = document.getElementById("video-grid");
      if (videoGird) {
        videoGird.classList.remove(nameId);
      }
      let call = connectionPeerjs.call(CallTo, MyVideoCall, {
        metadata: localStorage.getItem("access_token"),
      });

      call.on("stream", (remoteStream) => {
        if (MyVideo.current != null) {
          MyVideo.current.srcObject = remoteStream;
        }
      });
    } catch (err) {}
  }, []);
  return (
    <video
      id={nameId}
      className="camera"
      ref={MyVideo}
      autoPlay
      muted
    ></video>
  );
};

export default CardVideo;
// VideoCall
