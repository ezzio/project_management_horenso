import React, { useRef, useEffect, useState } from "react";
import { AiOutlineTeam, AiFillSetting, AiOutlinePlus } from "react-icons/ai";
import { GiExitDoor, GiSpeaker } from "react-icons/gi";
import { FaMicrophoneSlash, FaVideoSlash } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
import {
  BsChatSquareDots,
  BsFillPeopleFill,
  BsFillPersonPlusFill,
} from "react-icons/bs";
// eslint-disable-next-line
import "./MeetingRoom.scss";
import CardVideo from "./components/CardVideo/CardVideo";
import { openStream } from "./MeetingRoom.js";
import { setSizeVideoFitDiv } from "./components/CardVideo/setSizeVideoFitDiv";
import UserTag from "components/UserTag/UserTag";
import ChattingMeeting from "features/Chatting - Meeting/ChattingMeeting";
const MeetingRoom = () => {
  const [onModePresent, setOnModePresent] = useState(false);
  const [openTeammates, setOpenTeammates] = useState(false);
  const [openChatting, setOpenChatting] = useState(false);
  useEffect(() => {
    setSizeVideoFitDiv();
  }, []);

  return (
    <div className="videocall">
      <div className="videocall__container-video">
        {onModePresent && (
          <div className="videocall__container-video__presenter">
            <CardVideo owner={{ name: "Duong Dang Khoa" }} />
          </div>
        )}
        <div className="videocall__container-video__audiences">
          <CardVideo owner={{ name: "Duong Dang Khoa" }} />
          <CardVideo owner={{ name: "Duong Dang Khoa" }} />
          <CardVideo owner={{ name: "Duong Dang Khoa" }} />
          <CardVideo owner={{ name: "Duong Dang Khoa" }} />
          <CardVideo owner={{ name: "Duong Dang Khoa" }} />
          <CardVideo owner={{ name: "Duong Dang Khoa" }} />
          <CardVideo owner={{ name: "Duong Dang Khoa" }} />
          <CardVideo owner={{ name: "Duong Dang Khoa" }} />
          <CardVideo owner={{ name: "Duong Dang Khoa" }} />
          <CardVideo owner={{ name: "Duong Dang Khoa" }} />
          <CardVideo owner={{ name: "Duong Dang Khoa" }} />
          <CardVideo owner={{ name: "Duong Dang Khoa" }} />
        </div>
      </div>

      <div className="videocall__footer">
        <div className="videocall__footer__info-room">
          <p>22:03 | Báo cáo giai đoạn 1</p>
        </div>
        <div className="videocall__footer__controller">
          <button>
            <AiFillSetting />
          </button>
          <button>
            <FaMicrophoneSlash />
          </button>
          <button>
            <MdCallEnd style={{ color: "#fb3640" }} />
          </button>
          <button>
            <FaVideoSlash />
          </button>
          <button>
            <GiSpeaker />
          </button>
        </div>
        <div className="videocall__footer__feat">
          <BsFillPeopleFill
            onClick={() => {
              if (openChatting) {
                setOpenTeammates(!openTeammates);
                setOpenChatting(false);
              } else {
                setOpenTeammates(!openTeammates);
              }
            }}
          />
          <BsChatSquareDots
            onClick={() => {
              if (openTeammates) {
                setOpenChatting(!openChatting);
                setOpenTeammates(false);
              } else {
                setOpenChatting(!openChatting);
              }
            }}
          />
        </div>
      </div>
      {openTeammates && (
        <div className="ctn-video-feat teammate">
          <p>Member</p>
          <button className="teammate__add-member">
            <BsFillPersonPlusFill />
            <p>New member</p>
          </button>
          <div className="teammate__list-member teammate__list-member--online">
            <p>In the meeting</p>

            <div>
              <UserTag />
              <UserTag />
              <UserTag />
              <UserTag />
              <UserTag />
              <UserTag />
              <UserTag />
              <UserTag />
              <UserTag />
              <UserTag />
            </div>
          </div>
          <div className="teammate__list-member teammate__list-member--offline">
            <p>Absent</p>

            <div>
              <UserTag />
              <UserTag />
              <UserTag />
              <UserTag />
              <UserTag />
              <UserTag />
              <UserTag />
              <UserTag />
              <UserTag />
              <UserTag />
            </div>
          </div>
        </div>
      )}
      {openChatting && (
        <div className="ctn-video-feat chatting">
          <p>Chatting</p>
          <ChattingMeeting />
        </div>
      )}
    </div>
  );
};

export default MeetingRoom;
