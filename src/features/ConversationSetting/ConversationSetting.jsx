import { Typography } from 'antd';
import React from 'react';
import MembersInConvers from './components/MembersInConvers';
import './ConversationSetting.scss';

const { Title } = Typography;
const ConversationSetting = () => {
  const membersInConvers = [
    {
      userId: 1,
      user_displayName: 'Han Solo',
      avatarUrl: 'https://joeschmoe.io/api/v1/random',
      is_online: true,
    },
    {
      userId: 2,
      user_displayName: 'Buffly Gwen',
      avatarUrl: 'https://joeschmoe.io/api/v1/random',
      is_online: false,
    },
    {
      userId: 3,
      user_displayName: 'Donny Ngo',
      avatarUrl: 'https://joeschmoe.io/api/v1/random',
      is_online: true,
    },
  ];

  return (
    <div className='conversation-setting'>
      <div className='conversation-setting__role'>
        <div className='conversation-setting__role__list-members-online'>
          <Title level={5}>Online</Title>
          {membersInConvers.length > 0 &&
            membersInConvers.map((item) => {
              if (item.is_online === true)
                return (
                  <div className='currently-online-members'>
                    <MembersInConvers
                      key={item.userId}
                      userId={item.userId}
                      user_displayName={item.user_displayName}
                      avatarUrl={item.avatarUrl}
                      is_online={item.is_online}
                    />
                  </div>
                );
              else return;
            })}
        </div>
        <OfflineMembers membersInConvers={membersInConvers} />
      </div>
    </div>
  );
};

export default ConversationSetting;

export const OfflineMembers = ({ membersInConvers }) => {
  return (
    <div className='conversation-setting__role__list-members-offline'>
      <Title level={5}>Offline</Title>
      {membersInConvers.length > 0 &&
        membersInConvers.map((item) => {
          if (item.is_online === false)
            return (
              <div className='currently-offline-members'>
                <MembersInConvers
                  key={item.userId}
                  userId={item.userId}
                  user_displayName={item.user_displayName}
                  avatarUrl={item.avatarUrl}
                  is_online={item.is_online}
                />
              </div>
            );
          else return;
        })}
    </div>
  );
};
