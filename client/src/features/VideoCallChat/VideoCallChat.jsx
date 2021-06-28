import React from "react";
import PropTypes from "prop-types";
import "./VideoCallChat.scss";
import { FiSend } from "react-icons/fi";

const VideoCallChat = (props) => {
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
        <div className="ctn-video-call-chat__chat-box__user-chat">
          <img
            src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.18169-9/15181303_635777833275686_7392696705313445246_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=174925&_nc_ohc=slaUsJVsGukAX8ng1UH&tn=pDG68DIAaniiDuTb&_nc_ht=scontent.fvca1-1.fna&oh=9dc80ad866331e637fb16c84fb887704&oe=60E00861"
            alt=""
            height="40"
            width="40"
            style={{ borderRadius: "50%" }}
          />
          <div>
            <b>Phu Nguyen:</b>
            <section>
              <p>Hello world! 👨‍👩‍👦‍👦</p>
            </section>
            <section>
              <p>Con cho thang choi game rac 👨‍👩‍👦‍👦</p>
              <p>Waiting for? 🥱</p>
            </section>
            <section>
              <p>Con cho thang choi game rac 👨‍👩‍👦‍👦</p>
              <p>Waiting for? 🥱</p>
            </section>
          </div>
        </div>
        <div className="ctn-video-call-chat__chat-box__user-chat">
          <img
            src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.18169-9/15181303_635777833275686_7392696705313445246_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=174925&_nc_ohc=slaUsJVsGukAX8ng1UH&tn=pDG68DIAaniiDuTb&_nc_ht=scontent.fvca1-1.fna&oh=9dc80ad866331e637fb16c84fb887704&oe=60E00861"
            alt=""
            height="40"
            width="40"
            style={{ borderRadius: "50%" }}
          />
          <div>
            <b>Phu Nguyen:</b>
            <section>
              <p>Hello world! 👨‍👩‍👦‍👦</p>
            </section>
            <section>
              <p>Con cho thang choi game rac 👨‍👩‍👦‍👦</p>
              <p>Waiting for? 🥱</p>
            </section>
            <section>
              <p>Con cho thang choi game rac 👨‍👩‍👦‍👦</p>
              <p>Waiting for? 🥱</p>
            </section>
          </div>
        </div>
        <div className="ctn-video-call-chat__chat-box__user-chat">
          <img
            src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.18169-9/15181303_635777833275686_7392696705313445246_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=174925&_nc_ohc=slaUsJVsGukAX8ng1UH&tn=pDG68DIAaniiDuTb&_nc_ht=scontent.fvca1-1.fna&oh=9dc80ad866331e637fb16c84fb887704&oe=60E00861"
            alt=""
            height="40"
            width="40"
            style={{ borderRadius: "50%" }}
          />
          <div>
            <b>Phu Nguyen:</b>
            <section>
              <p>Hello world! 👨‍👩‍👦‍👦</p>
            </section>
            <section>
              <p>Con cho thang choi game rac 👨‍👩‍👦‍👦</p>
              <p>Waiting for? 🥱</p>
            </section>
            <section>
              <p>Con cho thang choi game rac 👨‍👩‍👦‍👦</p>
              <p>Waiting for? 🥱</p>
            </section>
          </div>
        </div>
        <div className="ctn-video-call-chat__chat-box__owner-chat">
          <div>
            <b>You:</b>

            <section>
              <p>Phu Nguyen Scam!! 🤬🤬</p>
            </section>
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

VideoCallChat.propTypes = {};

export default VideoCallChat;
