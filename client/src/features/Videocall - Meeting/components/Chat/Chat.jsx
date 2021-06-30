import React from "react";
import PropTypes from "prop-types";
import "./Chat.scss";
import { FiSend } from "react-icons/fi";

const Chat = (props) => {
  return (
    <div className="ctn-video-call-chat">
      <div className="ctn-video-call-chat__title">
        <h3>Group chat</h3>
        <div className="ctn-video-call-chat__title__control">
          <button className="active">Messages</button>
          <button>Participants</button>
        </div>
      </div>
      <div className="ctn-video-call-chat__chat-box">
        <div className="ctn-video-call-chat__chat-box__from-them">
          <div className="info">
            <img
              src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.18169-9/15181303_635777833275686_7392696705313445246_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=174925&_nc_ohc=slaUsJVsGukAX8ng1UH&tn=pDG68DIAaniiDuTb&_nc_ht=scontent.fvca1-1.fna&oh=9dc80ad866331e637fb16c84fb887704&oe=60E00861"
              alt=""
              height="40"
              width="40"
              style={{ borderRadius: "50%", marginRight: "10px" }}
            />
          </div>

          <div className="chat-text">
            <h6>PN: </h6>
            <p>Hey!!</p>
            <p>Help me plz</p>
          </div>
        </div>

        <div className="ctn-video-call-chat__chat-box__from-me">
          <div className="chat-text">
            <p>🤬🤬</p>
            <p>Hey, what's up!!</p>
          </div>
        </div>

        <div className="ctn-video-call-chat__chat-box__from-them">
          <div className="info">
            <img
              src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.18169-9/15181303_635777833275686_7392696705313445246_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=174925&_nc_ohc=slaUsJVsGukAX8ng1UH&tn=pDG68DIAaniiDuTb&_nc_ht=scontent.fvca1-1.fna&oh=9dc80ad866331e637fb16c84fb887704&oe=60E00861"
              alt=""
              height="40"
              width="40"
              style={{ borderRadius: "50%", marginRight: "10px" }}
            />
          </div>

          <div className="chat-text">
            <h6>PN: </h6>
            <p>I have a fucking bug 😫😫</p>
            <p>How to git push a new branch</p>
            <p>Help me plz</p>
          </div>
        </div>
        <div className="ctn-video-call-chat__chat-box__from-me">
          <div className="chat-text">
            <p>Chill</p>
          </div>
        </div>
      </div>
      <div className="ctn-video-call-chat__chat-field">
        <input type="text" placeholder="write your messages..." />
        <div>
          <FiSend className="icon" />
        </div>
      </div>
    </div>
  );
};

Chat.propTypes = {};

export default Chat;
