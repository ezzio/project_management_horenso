import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { setSizeVideoFitDiv } from "./setSizeVideoFitDiv";
import { io } from "socket.io-client";
import CardVideo from "./CardVideo/CardVideo";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Peer from "peerjs";
import ChattingMeeting from "features/ChattingMeeting/ChattingMeeting";
import Clock from "react-live-clock";

import {
  AudioMutedOutlined,
  AudioOutlined,
  TeamOutlined,
  MessageOutlined,
  PlusOutlined,
  VideoCameraAddOutlined,
  VideoCameraOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Space, Tooltip, message, notification } from "antd";
import {
  selectuserInRoom,
  stopAudioOnly,
  stopVideoOnly,
  someOneJoinRoom,
  stopAudioButton,
  stopVideoButton,
  someOneDisconnect,
  memberInRoomMeeting,
  listMemberInCanJoinMeetingRoomAsync,
} from "./meetingRoomSlice";
import "./MeetingRoom.scss";

import { useParams } from "react-router-dom";
import Title from "antd/lib/typography/Title";
import { useHistory } from "react-router-dom";
let socket = io("servervideocall.herokuapp.com");
// let socket = io("http://localhost:8000");

let peer = new Peer({
  secure: true,
  host: "mypeerserverjs.herokuapp.com",
  port: 443,
});
// let peer = new Peer({
//   host: "/",
//   port: 3002,
// });
const MeetingRoom = () => {
  const [openTeammates, setOpenTeammates] = useState(false);
  const [openChatting, setOpenChatting] = useState(false);
  const [openMicro, setOpenMicro] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);

  const dataGrid = useSelector((state) => state.roomMeeting.MemberInRoom);
  const dataUserInMeeting = useSelector(
    (state) => state.roomMeeting.memberInMeeting
  );
  const infoRoom = useSelector((state) => state.roomMeeting);
  const [listMemberInRoom, setListMemberInRoom] = useState([]);
  const dataUser = useSelector((state) => state.roomMeeting);

  const MyVideo = useRef();
  const avatarUrl = useSelector((state) => state.roomMeeting.avatarUrl);
  const [device, setdevice] = useState(true);
  const audio = useSelector((state) => state.roomMeeting.audio);
  const video = useSelector((state) => state.roomMeeting.video);

  const { idProject, idRoom } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const close = () => {
    history.goBack();
  };

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => history.goBack()}>
        Confirm
      </Button>
    );
    notification.open({
      message: "Notification Title",
      description: "Ban chua mo Video Call",
      btn,
      key,
      onClose: close,
    });
  };

  useEffect(() => {
    // setSizeVideoFitDiv();
    dispatch(listMemberInCanJoinMeetingRoomAsync({ idRoom }));

    peer.on("open", async (id) => {
      await localStorage.setItem("peerid", id);
      socket.emit("join_room", {
        username: sessionStorage.getItem("name"),
        room_id: idRoom,
        ownerId: localStorage.getItem("access_token"),
        peerId: id,
        avatar: sessionStorage.getItem("avatarURL"),
      });
    });
    socket.on("SomeOneJoin", async (userOnlineInRoom) => {
      message.info("One member just joined the room");
      // dispatch(memberInRoomMeeting(userOnlineInRoom));
      // setSizeVideoFitDiv();
      dispatch(someOneJoinRoom(userOnlineInRoom));
      // setSizeVideoFitDiv();
    });
    // socket.on("memberInRoom", (users) => {
    //   setSizeVideoFitDiv();
    //   dispatch(someOneJoinRoom(users));
    // });

    socket.on("totalInfoMemberInRoom", (data) => {
      dispatch(someOneJoinRoom(data));
    });
    socket.on("someOneDisconnect", async (userOut) => {
      try {
        let allvideo = document.querySelectorAll("video");
        setTimeout(function () {
          allvideo.forEach((video) => {
            if (video.id == userOut.idUserDisconnect) {
              video.remove();
            }
          });
        }, 2000);
        setSizeVideoFitDiv();
        dispatch(
          someOneDisconnect({
            userDisconect: userOut.idUserDisconnect,
            userCurrent: userOut.usersCurrentInroom,
          })
        );
      } catch (err) {
        console.log(err);
      }
    });
    socket.on("SomeOneCloseCamara", async (data) => {
      let { username, avatar, ownerId, currentRoom } = data;
      let getUserCloseCamera = document.getElementById(ownerId);
      let newDiv = document.createElement("div");
      newDiv.style.backgroundImage = ` url(${avatar})`;
      getUserCloseCamera.appendChild(newDiv);
    });

    openStrem(video, audio)
      .then(async (stream) => {
        if (MyVideo.current != null) {
          MyVideo.current.srcObject = stream;
        }
      })
      .catch((error) => {
        navigator.mediaDevices
          .getUserMedia({
            video: false,
            audio: true,
          })
          .then(async (stream) => {
            if (MyVideo.current != null) {
              MyVideo.current.srcObject = stream;
              setdevice(false);
            }
          })
          .catch((error) => {
            console.log(error);
            if (error) {
              openNotification();
            }
          });
      });
    peer.on("call", (call) => {
      call.answer(MyVideo.current.srcObject);
      // console.log(MyVideo.current.srcObject)
      call.on("stream", (remoteStream) => {
        // console.log(remoteStream)
        let videoGird = document.getElementById("video-grid");
        let allvideo = document.querySelectorAll("video");
        if (document.getElementById(call.options.metadata) == undefined) {
          let videoTest = document.createElement("video");
          videoTest.id = call.options.metadata;
          videoTest.className = "camera";
          videoTest.srcObject = remoteStream;
          videoTest.autoplay = true;
          if (videoGird) {
            videoGird.append(videoTest);

            // setSizeVideoFitDiv();
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    try {
      dispatch(stopAudioOnly(MyVideo.current.srcObject));
    } catch (e) {
      console.log("chua set up");
    }
  }, [audio]);

  useEffect(() => {
    try {
      dispatch(stopVideoOnly(MyVideo.current.srcObject));
      socket.emmit("close-video", localStorage.getItem("access_token"));
    } catch (e) {}
  }, [video]);

  // useEffect(() => {
  //   setListMemberInRoom(dataGrid);
  //   console.log(dataGrid);
  // }, [dataGrid]);
  // console.log(dataUserInMeeting)
  function openStrem(videoValue, audioValue) {
    return navigator.mediaDevices.getUserMedia({
      video: videoValue,
      audio: audioValue,
    });
  }
  return (
    <div className="videocall">
      <div className="videocall__container-video">
        <div className="videocall__container-video__audiences" id="video-grid">
          {device ? (
            <video className="camera" ref={MyVideo} autoPlay muted></video>
          ) : (
            <video
              style={{
                backgroundImage: `url('${avatarUrl.split(" ").join("%20")}')`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              className="camera"
              ref={MyVideo}
              autoPlay
              muted
            ></video>
          )}
          {dataGrid.length > 1 &&
            dataGrid.map((video) => {
              if (video.id != localStorage.getItem("access_token")) {
                if (MyVideo.current.srcObject) {
                  return (
                    <CardVideo
                      MyVideoCall={MyVideo.current.srcObject}
                      nameId={video.id}
                      connectionPeerjs={peer}
                      CallTo={video.peerId}
                    />
                  );
                }
              }
            })}
        </div>
      </div>

      <div className="videocall__footer">
        <div className="videocall__footer__info-room">
          {/* <b>
            {
              (moment(infoRoom.startTime).format("YYYY-MM-DD"),
              +" || " + infoRoom.roomName)
            }
          </b> */}
          <Title level={5} style={{ margin: "0px" }}>
            <Clock format={"MMMM Do, YYYY • h:mm:ss A"} ticking={true} />
          </Title>
        </div>
        <div className="videocall__footer__controller">
          <Space size="large">
            <Tooltip
              title={openMicro ? "Turn on microphone" : "Turn off microphone"}
            >
              <Button
                shape={"circle"}
                size="large"
                icon={openMicro ? <AudioMutedOutlined /> : <AudioOutlined />}
                danger={openMicro}
                onClick={() => {
                  setOpenMicro(!openMicro);
                  dispatch(stopAudioButton({ socketRoom: socket }));
                }}
              />
            </Tooltip>
            <Tooltip title={"Leave now"}>
              <Button
                type="primary"
                shape={"circle"}
                size="large"
                icon={<PoweroffOutlined />}
                onClick={() => {
                  try {
                    MyVideo.current.srcObject
                      .getTracks()
                      .forEach(function (track) {
                        track.stop();
                      });
                    history.goBack();
                    // history.push(`/${idProject}/meeting`);
                  } catch (e) {
                    history.goBack();
                    // history.push(`/${idProject}/meeting`);
                  }
                }}
                danger
              />
            </Tooltip>
            <Tooltip title={openCamera ? "Turn on camera" : "Turn off camera"}>
              <Button
                shape={"circle"}
                size="large"
                icon={
                  openCamera ? (
                    <VideoCameraAddOutlined />
                  ) : (
                    <VideoCameraOutlined />
                  )
                }
                danger={openCamera}
                onClick={() => {
                  setOpenCamera(!openCamera);
                  dispatch(stopVideoButton({ socket: socket, roomId: idRoom }));
                }}
              />
            </Tooltip>
          </Space>
        </div>
        <div className="videocall__footer__feat">
          <Space size="large">
            <Button
              type="primary"
              size="large"
              shape={"circle"}
              icon={<TeamOutlined />}
              onClick={() => {
                if (openChatting) {
                  setOpenTeammates(!openTeammates);
                  setOpenChatting(false);
                } else {
                  setOpenTeammates(!openTeammates);
                }
              }}
            />
            {/* <Button
              size="large"
              shape={"circle"}
              type="primary"
              icon={<MessageOutlined />}
              onClick={() => {
                setListMemberInRoom(dataGrid);
                if (openTeammates) {
                  setOpenChatting(!openChatting);
                  setOpenTeammates(false);
                } else {
                  setOpenChatting(!openChatting);
                }
              }}
            /> */}
          </Space>
        </div>
      </div>
      {openTeammates && (
        <div className="ctn-video-feat teammate">
          <Space direction="vertical">
            <Title level={3}>Members</Title>
            {/* <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              style={{ borderRadius: "0.5rem" }}
            >
              Add member
            </Button> */}
          </Space>

          <div className="teammate__list-member teammate__list-member--online">
            <b>In the meeting</b>
            <Space
              direction="vertical"
              size={"large"}
              style={{
                width: "100%",
                height: "100%",
                paddingTop: "1rem",
                overflow: "auto",
              }}
            >
              {dataGrid.length > 1 ? (
                dataGrid.map((eachMemBerOnline) => (
                  // console.log(eachMemBerOnline)
                  <Space size="middle">
                    <Avatar
                      icon={<UserOutlined />}
                      src={eachMemBerOnline.avatar}
                    />
                    <p>{eachMemBerOnline.display_name}</p>
                  </Space>
                ))
              ) : (
                <Space size="middle">
                  <Avatar
                    src={`${dataUser.avatarUrl}`}
                    icon={<UserOutlined />}
                  />
                  <p>{dataUser.displayName}</p>
                </Space>
              )}
            </Space>
          </div>
          <div className="teammate__list-member teammate__list-member--offline">
            <b>Absent</b>
            <Space
              direction="vertical"
              size={"large"}
              style={{
                width: "100%",
                height: "100%",
                paddingTop: "1rem",
                overflow: "auto",
              }}
            >
              {dataGrid > 1
                ? dataUserInMeeting.map(
                    (eachMemBerOnline) =>
                      eachMemBerOnline.id !==
                        localStorage.getItem("access_token") && (
                        <Space size="middle">
                          <Avatar
                            icon={<UserOutlined />}
                            src={eachMemBerOnline.avatar}
                          />
                          <p>{eachMemBerOnline.display_name}</p>
                        </Space>
                      )
                  )
                : dataUserInMeeting.map((eachMemBerOnline) => {
                    if (
                      eachMemBerOnline.id !==
                      localStorage.getItem("access_token")
                    ) {
                      let listDataId = dataGrid.map((items) => {
                        return items.id;
                      });
                      if (!listDataId.includes(eachMemBerOnline.id)) {
                        return (
                          <Space size="middle">
                            <Avatar
                              icon={<UserOutlined />}
                              src={eachMemBerOnline.avatar}
                            />
                            <p>{eachMemBerOnline.display_name}</p>
                          </Space>
                        );
                      }
                    }
                  })}
            </Space>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingRoom;
