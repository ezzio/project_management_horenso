import React, { useEffect } from 'react';
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
import { Link, useParams } from 'react-router-dom';
import { checkRoleUser } from './sideBarSlice';
import { useDispatch } from 'react-redux';

const { SubMenu } = Menu;
const { Sider } = Layout;
const { Title } = Typography;

const SideBar = () => {
  const [isColapsed, setIsColapsed] = useState(false);
  const { idProject } = useParams();
  const dispatch = useDispatch();

  const onCollapse = (collapsed) => {
    setIsColapsed(!isColapsed);
  };

  useEffect(() => {
    dispatch(
      checkRoleUser({
        id: localStorage.getItem('access_token'),
        idProject,
      })
    );
  });
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
        <Menu
          theme="dark"
          defaultSelectedKeys={[localStorage.getItem('sider')]}
          selectedKeys={[localStorage.getItem('sider')]}
          mode="inline"
        >
          <Menu.Item
            key="1"
            icon={
              <PieChartFilled style={{ color: 'white', fontSize: '1.15rem' }} />
            }
          >
            <Link
              to={`/${idProject}/dashboard`}
              style={{ color: 'white' }}
              onClick={() => localStorage.setItem('sider', '1')}
            >
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={
              <CarryOutFilled style={{ color: 'white', fontSize: '1.15rem' }} />
            }
          >
            <Link
              to={`/${idProject}/jobs`}
              style={{ color: 'white' }}
              onClick={() => localStorage.setItem('sider', '2')}
            >
              Jobs
            </Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={
              <DatabaseFilled style={{ color: 'white', fontSize: '1.15rem' }} />
            }
          >
            <Link
              to={`/${idProject}/storage`}
              style={{ color: 'white' }}
              onClick={() => localStorage.setItem('sider', '3')}
            >
              Storage
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
              <Link
                to={`/${idProject}/meeting`}
                style={{ color: 'white' }}
                onClick={() => localStorage.setItem('sider', '5')}
              >
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
              <Link
                to={`/${idProject}/conversation`}
                style={{ color: 'white' }}
                onClick={() => localStorage.setItem('sider', '6')}
              >
                Conversation
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
              <Link
                to={`/${idProject}/teammate`}
                style={{ color: 'white' }}
                onClick={() => localStorage.setItem('sider', '8')}
              >
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
              <Link
                to={`/${idProject}/setting`}
                style={{ color: 'white' }}
                onClick={() => localStorage.setItem('sider', '9')}
              >
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
