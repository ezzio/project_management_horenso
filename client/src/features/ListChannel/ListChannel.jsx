import React, { useState } from "react";
import { FcFolder, FcBriefcase, FcCollaboration, FcSettings } from "react-icons/fc";
import { useSelector } from "react-redux";
import "./ListChannel.scss";
import { AiOutlinePlus } from "react-icons/ai";
import WorkspaceModal from "./Modals/WorkspaceModal";
import OthersModal from "./Modals/OthersModal";
import TeamsModal from "./Modals/TeamsModal";
import ChannelDrawer from "./component/ChannelDrawer";

const Listchannel = () => {
  const channels = useSelector((state) => state.createChannel);

  const [openWorkspaceModal, setOpenWorkspaceModal] = useState(false);
  const [openTeamsModal, setOpenTeamsModal] = useState(false);
  const [openOthersModal, setOpenOthersModal] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [channelID, setChannelID] = useState(0);
  const [channelName, setChannelName] = useState('');
  const [channelType, setChannelType] = useState('');


  const openDrawer = (id, name, type) => {
      setChannelID(id);
      setChannelName(name)
      setChannelType(type)
      setDrawerVisible(true)
  }

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
              openWorkspaceModal={openWorkspaceModal}
              setOpenWorkspaceModal={setOpenWorkspaceModal}
            />
          </div>
          {channels.workspace.map((channel) => {
            return (
              <li tabIndex="-1" className="list-channel__group__btn">
                <a href="#">{channel.name}</a>
                <FcSettings 
                    style={{position: 'absolute', right: 50}}
                    onClick={() => openDrawer(channel.id, channel.name, 'workspace')}
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
              openTeamsModal={openTeamsModal}
              setOpenTeamsModal={setOpenTeamsModal}
            />
          </div>
          {channels.teams.map((channel) => {
            return (
              <li tabIndex="-1" className="list-channel__group__btn">
                <a href="#">{channel.name}</a>
                <FcSettings 
                    style={{position: 'absolute', right: 50}}
                    onClick={() => openDrawer(channel.id, channel.name, 'teams')}
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
              openOthersModal={openOthersModal}
              setOpenOthersModal={setOpenOthersModal}
            />
          </div>
          {channels.others.map((channel) => {
            return (
              <li tabIndex="-1" className="list-channel__group__btn">
                <a href="#">{channel.name}</a>
                <FcSettings 
                    style={{position: 'absolute', right: 50}}
                    onClick={() => openDrawer(channel.id, channel.name, 'others')}
                />
              </li>
            );
          })}
        </ul>
        <div className="btn-add-channel">
          <AiOutlinePlus />
        </div>
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
