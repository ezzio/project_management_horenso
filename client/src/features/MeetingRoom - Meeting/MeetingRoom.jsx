import React, { useRef, useEffect, useState } from "react";
import { AiOutlineTeam, AiFillSetting } from "react-icons/ai";
import { GiExitDoor, GiSpeaker } from "react-icons/gi";
import { FaMicrophoneSlash, FaVideoSlash } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
import { BsChatSquareDots, BsFillPeopleFill } from "react-icons/bs";
// eslint-disable-next-line
import "./MeetingRoom.scss";
import CardVideo from "./components/CardVideo/CardVideo";
import { openStream } from "./MeetingRoom.js";
import { setSizeVideoFitDiv } from "./components/CardVideo/setSizeVideoFitDiv";
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
      {openTeammates && <div className="ctn-video-feat teammate">Teammate</div>}
      {openChatting && <div className="ctn-video-feat chatting">Chatting</div>}
    </div>
  );
};

export default MeetingRoom;
