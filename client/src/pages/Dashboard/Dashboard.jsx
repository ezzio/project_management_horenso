import React from 'react';
// library dependencies
import { Space, Typography } from 'antd';

// icon
import { FundOutlined, AlertOutlined } from '@ant-design/icons';
// css
import './Dashboard.scss';

// components
import LinePlot from './components/LinePlot/LinePlot';
import ActivityFeed from './components/ActivityFeed/ActivityFeed';
import TaskCounter from './components/TaskCounter/TaskCounter';
const { Title } = Typography;

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* <div className="dashboard__header">
        <TaskCounter />
      </div> */}
      <div className="dashboard__body">
        <div className="dashboard__body__left">
          <div className="left-content">
            <div className="left-content__top">
              <Space style={{ marginBottom: '1rem' }}>
                <FundOutlined style={{ fontSize: '1rem' }} />
                <Title level={5} style={{ marginBottom: 0, lineHeight: 0 }}>
                  Jobs Progress
                </Title>
              </Space>
              <LinePlot />
            </div>
            <div className="left-content__bottom">
              <Space style={{ marginBottom: '1rem' }}>
                <AlertOutlined style={{ fontSize: '1rem' }} />
                <Title level={5} style={{ marginBottom: 0, lineHeight: 0 }}>
                  Activity feed
                </Title>
              </Space>
              <ActivityFeed />
            </div>
          </div>
        </div>
        <div className="dashboard__body__right"></div>
      </div>
    </div>
  );
};

export default Dashboard;
