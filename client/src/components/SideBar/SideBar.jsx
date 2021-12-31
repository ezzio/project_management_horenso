import React from 'react';
import { Layout, Menu, Space, Tooltip, Typography } from 'antd';
import {
  PieChartFilled,
  HomeFilled,
  GithubFilled,
  CarryOutFilled,
  DatabaseFilled,
  SettingFilled,
  ToolFilled,
  RocketFilled,
  VideoCameraFilled,
  MessageFilled,
  ScheduleFilled,
  SkinFilled,
} from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Sider } = Layout;
const { Title } = Typography;

const SideBar = () => {
  const [isColapsed, setIsColapsed] = useState(false);

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setIsColapsed(!isColapsed);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={isColapsed}
        onCollapse={onCollapse}
        width={250}
      >
        <div
          style={{
            color: 'white',
            height: '2.5rem',
            margin: '2rem 1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Space style={isColapsed ? { gap: '0' } : { gap: '4px' }}>
            <Title
              level={2}
              style={
                !isColapsed
                  ? {
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 1, 1)',
                      color: 'white',
                      margin: '0',
                    }
                  : {
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 1, 1)',
                      color: 'white',
                      fontSize: '1rem',
                      margin: '0',
                    }
              }
            >
               Kanso
            </Title>
          </Space>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item
            key="1"
            icon={
              <PieChartFilled style={{ color: 'white', fontSize: '1.15rem' }} />
            }
          >
            <Link to="/dashboard" style={{ color: 'white' }}>
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={
              <CarryOutFilled style={{ color: 'white', fontSize: '1.15rem' }} />
            }
          >
            <Link to="/jobs" style={{ color: 'white' }}>
              Jobs
            </Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={
              <DatabaseFilled style={{ color: 'white', fontSize: '1.15rem' }} />
            }
          >
            <Link to="/storage" style={{ color: 'white' }}>
              Storage
            </Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={
              <GithubFilled style={{ color: 'white', fontSize: '1.15rem' }} />
            }
          >
            <Link to="/github" style={{ color: 'white' }}>
              Github
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            icon={
              <RocketFilled style={{ color: 'white', fontSize: '1.15rem' }} />
            }
            title="Horenso"
          >
            <Menu.Item
              key="5"
              icon={
                <VideoCameraFilled
                  style={{ color: 'white', fontSize: '1.15rem' }}
                />
              }
            >
              <Link to="/meeting" style={{ color: 'white' }}>
                Meeting
              </Link>
            </Menu.Item>
            <Menu.Item
              key="6"
              icon={
                <MessageFilled
                  style={{ color: 'white', fontSize: '1.15rem' }}
                />
              }
            >
              <Link to="/conversation" style={{ color: 'white' }}>
                Conversation
              </Link>
            </Menu.Item>
            <Menu.Item
              key="7"
              icon={
                <ScheduleFilled
                  style={{ color: 'white', fontSize: '1.15rem' }}
                />
              }
            >
              <Link to="/report" style={{ color: 'white' }}>
                Report
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={
              <ToolFilled style={{ color: 'white', fontSize: '1.15rem' }} />
            }
            title="Option"
          >
            <Menu.Item
              key="8"
              icon={
                <SkinFilled style={{ color: 'white', fontSize: '1.15rem' }} />
              }
            >
              <Link to="/teammate" style={{ color: 'white' }}>
                Teammate
              </Link>
            </Menu.Item>
            <Menu.Item
              key="9"
              icon={
                <SettingFilled
                  style={{ color: 'white', fontSize: '1.15rem' }}
                />
              }
            >
              <Link to="/setting" style={{ color: 'white' }}>
                Setting
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            bottom: '4rem',
          }}
        >
          <Tooltip
            title="Back to profile"
            placement={isColapsed ? 'left' : 'top'}
          >
            <Link to="/" style={{ color: 'white' }}>
              <HomeFilled
                style={{
                  color: 'white',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
              />
            </Link>
          </Tooltip>
        </div>
      </Sider>
    </Layout>
  );
};

export default SideBar;
