import React, { useState } from 'react';
import { Drawer, List, Popconfirm, message } from 'antd'
import '../ListChannel.scss'
import { deleteChannel } from '../ListChannelSlice';
import { useDispatch } from 'react-redux'
import ChannelNameChangeModal from './ChannelNameChangeModal';
import ChannelInviteModal from './ChannelInviteModal';

function ChannelDrawer({id, name, type, drawerVisible, setDrawerVisible}) {
    const [openNameChangeModal, setOpenNameChangeModal] = useState(false);
    const [openInviteModal, setOpenInviteModal] = useState(false);

    const drawerTitle = name + ' channel settings';

    const dispatch = useDispatch((state) => state.createChannel);

    const handleDeleteChannel = (id, type) => {
        const channelInfo = {
            id,
            type,
        }
        dispatch(deleteChannel(channelInfo));
        message.success('Channel deleted successfully!');
        setDrawerVisible(false);
    }

    return ( 
        <div>
            <Drawer
                title={drawerTitle}
                placement='left'
                width={500}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
            >
                <List
                    itemLayout='vertical'
                >   
                    <List.Item 
                        className="list-channel__group__btn"
                        onClick={() => setOpenNameChangeModal(true)}
                    >
                        <span style={{fontWeight: 'bold'}}>
                            Change channel name
                        </span>
                    </List.Item>
                    <List.Item 
                        className="list-channel__group__btn"
                        onClick={() => setOpenInviteModal(true)}
                    >
                        <span style={{fontWeight: 'bold'}}>
                            Invite members
                        </span>
                    </List.Item>
                    <Popconfirm
                        title='Are you sure you want to delete this channel?'
                        onConfirm={() => handleDeleteChannel(id, type)}
                        okText='Yes'
                        cancelText='No'
                    >
                        <List.Item className="list-channel__group__btn">
                            <span style={{color: 'red', fontWeight: 'bold'}}>Delete channel</span>
                        </List.Item>
                    </Popconfirm>
                </List>
            </Drawer>
            <ChannelNameChangeModal 
                id={id} name={name} type={type}
                openNameChangeModal={openNameChangeModal}
                setOpenNameChangeModal={setOpenNameChangeModal}
            />
            <ChannelInviteModal 
                id={id} name={name} type={type}
                openInviteModal={openInviteModal}
                setOpenInviteModal={setOpenInviteModal}
            />
        </div>
  )
}

export default ChannelDrawer;
