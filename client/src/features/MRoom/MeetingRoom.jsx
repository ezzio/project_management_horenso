import React, { useState } from 'react';
import { useEffect } from 'react';
import { setSizeVideoFitDiv } from './setSizeVideoFitDiv';
import CardVideo from './CardVideo/CardVideo';
import ChattingMeeting from 'features/ChattingMeeting/ChattingMeeting';

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
} from '@ant-design/icons';
import { Avatar, Button, Space, Tooltip } from 'antd';

import './MeetingRoom.scss';
import Title from 'antd/lib/typography/Title';

const MeetingRoom = () => {
  const [openTeammates, setOpenTeammates] = useState(false);
  const [openChatting, setOpenChatting] = useState(false);
  const [openMicro, setOpenMicro] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);

  useEffect(() => {
    setSizeVideoFitDiv();
  }, []);

  return (
    <div className="videocall">
      <div className="videocall__container-video">
        <div className="videocall__container-video__audiences">
          {/* render video chat here */}
          <CardVideo owner={{ name: 'Duong Dang Khoa' }} />
          <CardVideo owner={{ name: 'Duong Dang Khoa' }} />
          <CardVideo owner={{ name: 'Duong Dang Khoa' }} />
          <CardVideo owner={{ name: 'Duong Dang Khoa' }} />
          <CardVideo owner={{ name: 'Duong Dang Khoa' }} />
        </div>
      </div>

      <div className="videocall__footer">
        <div className="videocall__footer__info-room">
          <b>22:03 | Báo cáo giai đoạn 1</b>
        </div>
        <div className="videocall__footer__controller">
          <Space size="large">
            <Tooltip
              title={openMicro ? 'Turn on microphone' : 'Turn off microphone'}
            >
              <Button
                shape={'circle'}
                size="large"
                icon={openMicro ? <AudioMutedOutlined /> : <AudioOutlined />}
                danger={openMicro}
                onClick={() => setOpenMicro(!openMicro)}
              />
            </Tooltip>
            <Tooltip title={'Leave now'}>
              <Button
                type="primary"
                shape={'circle'}
                size="large"
                icon={<PoweroffOutlined />}
                danger
              />
            </Tooltip>
            <Tooltip title={openCamera ? 'Turn on camera' : 'Turn off camera'}>
              <Button
                shape={'circle'}
                size="large"
                icon={
                  openCamera ? (
                    <VideoCameraAddOutlined />
                  ) : (
                    <VideoCameraOutlined />
                  )
                }
                danger={openCamera}
                onClick={() => setOpenCamera(!openCamera)}
              />
            </Tooltip>
          </Space>
        </div>
        <div className="videocall__footer__feat">
          <Space size="large">
            <Button
              type="primary"
              size="large"
              shape={'circle'}
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
            <Button
              size="large"
              shape={'circle'}
              type="primary"
              icon={<MessageOutlined />}
              onClick={() => {
                if (openTeammates) {
                  setOpenChatting(!openChatting);
                  setOpenTeammates(false);
                } else {
                  setOpenChatting(!openChatting);
                }
              }}
            />
          </Space>
        </div>
      </div>
      {openTeammates && (
        <div className="ctn-video-feat teammate">
          <Space direction="vertical">
            <Title level={3}>Members</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              style={{ borderRadius: '0.5rem' }}
            >
              Add member
            </Button>
          </Space>

          <div className="teammate__list-member teammate__list-member--online">
            <b>In the meeting</b>
            <Space
              direction="vertical"
              size={'large'}
              style={{
                width: '100%',
                height: '100%',
                paddingTop: '1rem',
                overflow: 'auto',
              }}
            >
              <Space size="middle">
                <Avatar icon={<UserOutlined />} />
                <p>Han solo</p>
              </Space>
            </Space>
          </div>
          <div className="teammate__list-member teammate__list-member--offline">
            <b>Absent</b>
            <Space
              direction="vertical"
              size={'large'}
              style={{
                width: '100%',
                height: '100%',
                paddingTop: '1rem',
                overflow: 'auto',
              }}
            >
              <Space size="middle">
                <Avatar icon={<UserOutlined />} />
                <p>Han solo</p>
              </Space>
            </Space>
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
