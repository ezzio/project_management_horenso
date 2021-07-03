import React, { useRef, useEffect } from "react";
import { AiOutlineTeam, AiFillSetting } from "react-icons/ai";
import { GiExitDoor, GiSpeaker } from "react-icons/gi";
import { FaMicrophoneSlash, FaVideoSlash } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
// eslint-disable-next-line
import PropTypes from "prop-types";
import "./Videocall.scss";
import { openStream } from "./Videocall.js";
import Chat from "./components/Chat/Chat.jsx";
import { Link } from "react-router-dom";
const Videocall = (props) => {
  const videoEl = useRef(null);
  useEffect(() => {
    if (!videoEl) {
      return;
    }
    openStream(videoEl);
  }, [videoEl]);
  return (
    <div className="ctn-video-call">
      <div style={{ width: "70%", paddingRight: "1em" }}>
        <div className="ctn-video-call__title">
          <h2>Phân tích giai đoạn xây dựng giao diện người dùng</h2>
        </div>
        <div className="ctn-video-call__control-user">
          <div className="ctn-video-call__control-user__show-detail">
            <section>
              <AiOutlineTeam />
              <p>Thành viên đang có mặt: </p>
              <div className="circle circle--green">
                <p>6</p>
              </div>
            </section>
            <section>
              <GiExitDoor />
              <p>Thành viên vắng mặt:</p>
              <div className="circle circle--red">
                <p>2</p>
              </div>
            </section>
          </div>
          <div className="ctn-video-call__control-user__add-user">
            <div className="circle circle--green--bg">
              <p>+</p>
            </div>
            <p>Thêm thành viên vào cuộc họp</p>
          </div>
        </div>

        <div className="ctn-video-call__video-box">
          <video ref={videoEl} className="ctn-video-call__video-box__camera" />
          <div className="ctn-video-call__video-box__owner">
            <img
              src="https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.6435-9/83162431_1059481474384512_829843550521786368_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=BBNtA7XUq3wAX9w0eb5&_nc_ht=scontent.fsgn8-1.fna&oh=c38b0b10530a46340cdb1c7ded257ada&oe=60DFC235"
              alt=""
              height="50"
              width="50"
              style={{ borderRadius: "10px" }}
            />
            <div>
              <p>Leader</p>
              <h3>Kate Smith</h3>
            </div>
          </div>
          <div className="ctn-video-call__video-box__team-mate">
            <div>
              <img
                src="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.18169-9/15181303_635777833275686_7392696705313445246_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=174925&_nc_ohc=slaUsJVsGukAX8ng1UH&tn=pDG68DIAaniiDuTb&_nc_ht=scontent.fvca1-1.fna&oh=9dc80ad866331e637fb16c84fb887704&oe=60E00861"
                alt=""
                height="64"
                width="64"
                style={{ borderRadius: "5px" }}
              />
            </div>
            <div>
              <img
                src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/61439656_2219291788288474_2348156013401604096_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=174925&_nc_ohc=vGsQiR1syNQAX-owhQL&_nc_ht=scontent.fsgn4-1.fna&oh=34dae99a21d071025ae5eca996f132b8&oe=60E07B04"
                alt=""
                height="64"
                width="64"
                style={{ borderRadius: "5px" }}
              />
            </div>
          </div>
          <div className="ctn-video-call__video-box__controller">
            <div className="btn-opacity control">
              <GiSpeaker />
            </div>
            <div className="btn-opacity control">
              <FaMicrophoneSlash />
            </div>
            <Link to="/meeting" className="btn-opacity--red control">
              <MdCallEnd />
            </Link>
            <div className="btn-opacity control">
              <FaVideoSlash />
            </div>
            <div className="btn-opacity control">
              <AiFillSetting />
            </div>
          </div>
        </div>
      </div>

      <Chat />
    </div>
  );
};

Videocall.propTypes = {};

export default Videocall;
