import React from 'react';
import { useState } from 'react';
// -> antd
import { Badge, Dropdown, Menu, Space, Tooltip, Typography } from 'antd';
// -> icon
import { BellOutlined, LogoutOutlined } from '@ant-design/icons';
// -> css
import './Header.scss';
const { Title, Text } = Typography;
const Header = () => {
  const [notifications, setNotifications] = useState([
    {title: 'Bạn vừa nhận một task #012 trong dự án #12'},

  ]);
  const notificationsListRender = (
    <Menu>
      {notifications.length > 0 &&
        notifications.map((item, index) => {
          return (
            <Menu.Item key={index}>
              <Text>{item.title}</Text>
            </Menu.Item>
          );
        })}
    </Menu>
  );

  return (
    <div className="user-setting-header">
      <Title level={2}>Kanso</Title>
      <Space size={'large'}>
        <Badge dot={Boolean(notifications.length > 0)}>
          {notifications.length > 0 ? (
            <Dropdown overlay={notificationsListRender} trigger={['click']}>
              <BellOutlined
                style={{ fontSize: 24, color: 'black', cursor: 'pointer' }}
              />
            </Dropdown>
          ) : (
            <Tooltip title="You don't have any notification" placement="left">
              <BellOutlined style={{ fontSize: 24, color: 'black' }} />
            </Tooltip>
          )}
        </Badge>
        <Tooltip title="Log out">
          <LogoutOutlined style={{ fontSize: 24, cursor: 'pointer' }} />
        </Tooltip>
      </Space>
    </div>
  );
};

export default Header;
