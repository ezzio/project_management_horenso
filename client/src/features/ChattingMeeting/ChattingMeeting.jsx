import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import "./ChattingMeeting.scss";
const ChattingMeeting = () => {
  return (
    <div className="chatting-meeting">
      <div className="chatting-meeting__box"></div>

      <div className="chatting-meeting__field">
        <input placeholder="your message here ..."></input>
        <FaTelegramPlane />
      </div>
    </div>
  );
};

export default ChattingMeeting;
