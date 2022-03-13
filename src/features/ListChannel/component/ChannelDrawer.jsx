import React, { useState } from 'react';
import { Drawer, List, Popconfirm, message, Typography } from 'antd';
import '../ListChannel.scss';
import { deleteChannel, deleteChannelAsync } from '../ListChannelSlice';
import { useDispatch } from 'react-redux';
import ChannelNameChangeModal from './ChannelNameChangeModal';
import ChannelInviteModal from './ChannelInviteModal';
import { useParams } from 'react-router-dom';

const { Title } = Typography;

function ChannelDrawer({ id, name, type, drawerVisible, setDrawerVisible }) {
  const [openNameChangeModal, setOpenNameChangeModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const params = useParams();

  // const drawerTitle = name + ' channel settings';

  const dispatch = useDispatch((state) => state.createChannel);
  const idProject = params.idProject;

  const handleDeleteChannel = (id, type) => {
    const channelInfo = {
      id,
      type,
    };
    dispatch(deleteChannel(channelInfo));
    dispatch(
      deleteChannelAsync({
        idRoom: id,
        idProject: idProject,
        roomNameConversation: type,
      })
    );
    setDrawerVisible(false);
  };

  return (
    <div>
      <Drawer
        title={<Title level={3}>{name}</Title>}
        placement="left"
        width={500}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <List itemLayout="vertical">
          <List.Item
            className="list-channel__group__btn"
            onClick={() => setOpenNameChangeModal(true)}
          >
            <Title level={5}>Change channel name</Title>
          </List.Item>
          <List.Item
            className="list-channel__group__btn"
            onClick={() => setOpenInviteModal(true)}
          >
            <Title level={5}>Invite members</Title>
          </List.Item>
          <Popconfirm
            title="Are you sure you want to delete this channel?"
            onConfirm={() => handleDeleteChannel(id, type)}
            okText="Yes"
            cancelText="No"
          >
            <List.Item className="list-channel__group__btn">
              <Title level={5} style={{ color: 'red' }}>
                Delete channel
              </Title>
            </List.Item>
          </Popconfirm>
        </List>
      </Drawer>
      <ChannelNameChangeModal
        id={id}
        name={name}
        type={type}
        openNameChangeModal={openNameChangeModal}
        setOpenNameChangeModal={setOpenNameChangeModal}
        setDrawerVisible={setDrawerVisible}
      />
      <ChannelInviteModal
        id={id}
        name={name}
        type={type}
        openInviteModal={openInviteModal}
        setOpenInviteModal={setOpenInviteModal}
        setDrawerVisible={setDrawerVisible}
      />
    </div>
  );
}

export default ChannelDrawer;
