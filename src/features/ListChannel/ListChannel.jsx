import React, { useState } from "react";
import {
  FcFolder,
  FcBriefcase,
  FcCollaboration,
  FcSettings,
} from "react-icons/fc";
import { useSelector } from "react-redux";
import "./ListChannel.scss";
import { AiOutlinePlus } from "react-icons/ai";
import WorkspaceModal from "./Modals/WorkspaceModal";
import OthersModal from "./Modals/OthersModal";
import TeamsModal from "./Modals/TeamsModal";
import ChannelDrawer from "./component/ChannelDrawer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ListKanban } from "features/KanbanDashBoard/KanbanDashBoardSlice";
import { useParams, useHistory, Link } from "react-router-dom";
import { getListChannel } from "./ListChannelSlice";
import { message, Spin } from "antd";

const Listchannel = () => {
  const channels = useSelector((state) => state.createChannel);
  const conversationId = useSelector(
    (state) => state.createChannel.conversationId
  );

  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const [openWorkspaceModal, setOpenWorkspaceModal] = useState(false);
  const [openTeamsModal, setOpenTeamsModal] = useState(false);
  const [openOthersModal, setOpenOthersModal] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [channelID, setChannelID] = useState(0);
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState("");

  const members = useSelector((state) => state.kanban.membersInProject);
  // console.log(members);

  const openDrawer = (idRoom, name, type) => {
    setChannelID(idRoom);
    setChannelName(name);
    setChannelType(type);
    setDrawerVisible(true);
  };

  const idProject = params.idProject;
  useEffect(() => {
    dispatch(ListKanban());
    dispatch(getListChannel(idProject));
  }, []);

  return (
    <>
      <div className="list-channel">
        <ul className="list-channel__group">
          <div className="list-channel__group__title">
            <section>
              <FcBriefcase />
              <h5>WORKSPACE</h5>
            </section>
            <AiOutlinePlus
              className="add"
              onClick={() => setOpenWorkspaceModal(true)}
            />
          </div>
          <div>
            <WorkspaceModal
              members={members}
              openWorkspaceModal={openWorkspaceModal}
              setOpenWorkspaceModal={setOpenWorkspaceModal}
              conversationId={conversationId}
            />
          </div>
          {channels.workspace.map((channel) => {
            return (
              <li tabIndex="-1" className="list-channel__group__btn">
                <Link
                  className="list-channel__group__btn__name"
                  to={`/${idProject}/conversation/${channel.idRoom}`}
                >
                  {channel.name}
                </Link>
                <FcSettings
                  style={{ position: "absolute", right: "0%", margin: "1rem" }}
                  onClick={() =>
                    openDrawer(channel.idRoom, channel.name, "workSpace")
                  }
                />
              </li>
            );
          })}
        </ul>
        <ul className="list-channel__group">
          <div className="list-channel__group__title">
            <section>
              <FcCollaboration />
              <h5>TEAMS</h5>
            </section>
            <AiOutlinePlus
              className="add"
              onClick={() => setOpenTeamsModal(true)}
            />
          </div>
          <div>
            <TeamsModal
              members={members}
              openTeamsModal={openTeamsModal}
              setOpenTeamsModal={setOpenTeamsModal}
              conversationId={conversationId}
            />
          </div>
          {channels.teams.map((channel) => {
            return (
              <li tabIndex="-1" className="list-channel__group__btn">
                <Link
                  className="list-channel__group__btn__name"
                  to={`/${idProject}/conversation/${channel.idRoom}`}
                >
                  {channel.name}
                </Link>
                <FcSettings
                  style={{ position: "absolute", right: "0%", margin: "1rem" }}
                  onClick={() =>
                    openDrawer(channel.idRoom, channel.name, "teams")
                  }
                />
              </li>
            );
          })}
        </ul>
        <ul className="list-channel__group">
          <div className="list-channel__group__title">
            <section>
              <FcFolder />
              <h5>OTHERS</h5>
            </section>
            <AiOutlinePlus
              className="add"
              onClick={() => setOpenOthersModal(true)}
            />
          </div>
          <div>
            <OthersModal
              members={members}
              openOthersModal={openOthersModal}
              setOpenOthersModal={setOpenOthersModal}
              conversationId={conversationId}
            />
          </div>
          {channels.others.map((channel) => {
            return (
              <li tabIndex="-1" className="list-channel__group__btn">
                <Link
                  className="list-channel__group__btn__name"
                  to={`/${idProject}/conversation/${channel.idRoom}`}
                >
                  {channel.name}
                </Link>
                <FcSettings
                  style={{ position: "absolute", right: "0%", margin: "1rem" }}
                  onClick={() =>
                    openDrawer(channel.idRoom, channel.name, "others")
                  }
                />
              </li>
            );
          })}
        </ul>
      </div>

      <ChannelDrawer
        id={channelID}
        name={channelName}
        type={channelType}
        drawerVisible={drawerVisible}
        setDrawerVisible={setDrawerVisible}
      />
    </>
  );
};

export default Listchannel;
