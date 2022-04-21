import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
// import { selectuserInRoom } from 'pages/Room/RoomSlice';
import { setSizeVideoFitDiv } from "../setSizeVideoFitDiv";
const CardVideo = ({ connectionPeerjs, CallTo, nameId, MyVideoCall }) => {
  const MyVideo = useRef();
  console.log(MyVideoCall);
  useEffect(() => {
    try {
      let call = connectionPeerjs.call(CallTo, MyVideoCall, {
        metadata: localStorage.getItem("access_token"),
      });
      call.on("stream", (remoteStream) => {
        if (MyVideo.current != null) {
          MyVideo.current.srcObject = remoteStream;
        }
      });
      let videoGird = document.getElementById("video-grid");
      if (videoGird) {
        videoGird.classList.remove(nameId);
      }
      // setSizeVideoFitDiv();
    } catch (err) {}
  }, []);
  return <video id={nameId} className="camera" ref={MyVideo} autoPlay></video>;
};

export default CardVideo;
// VideoCall
