import React from "react";
// library dependencies
import { Space, Typography, Tabs } from "antd";

// icon
import {
  FundOutlined,
  AlertOutlined,
  RocketOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
// css
import "./Dashboard.scss";

// components
import LinePlot from "./components/LinePlot/LinePlot";
import ActivityFeed from "./components/ActivityFeed/ActivityFeed";
import TaskCounter from "./components/TaskCounter/TaskCounter";
import JobStatus from "./components/JobStatus/JobStatus";
import TargetPercent from "./components/TargetPercent/TargetPercent";
const { Title } = Typography;
const { TabPane } = Tabs;

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
              <Space style={{ marginBottom: "1rem" }}>
                <FundOutlined style={{ fontSize: "1rem" }} />
                <Title level={5} style={{ marginBottom: 0, lineHeight: 0 }}>
                  Jobs Progress
                </Title>
              </Space>
              <LinePlot />
            </div>
            <div className="left-content__bottom">
              <Space style={{ marginBottom: "1rem" }}>
                <AlertOutlined style={{ fontSize: "1rem" }} />
                <Title level={5} style={{ marginBottom: 0, lineHeight: 0 }}>
                  Activity feed
                </Title>
              </Space>
            </div>
          </div>
        </div>
        <div className="dashboard__body__right">
          <div className="right-content">
            <div className="right-content__top">
              <Tabs defaultActiveKey="1" centered>
                <TabPane
                  tab={
                    <span>
                      <RocketOutlined style={{ fontSize: "1rem" }} />
                      Target's Percent
                    </span>
                  }
                  key="1"
                >
                  <TargetPercent />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <PieChartOutlined style={{ fontSize: "1rem" }} />
                      Job's Status
                    </span>
                  }
                  key="2"
                >
                  <JobStatus />
                </TabPane>
              </Tabs>
            </div>
            <div className="right-content__bottom">
              <div className="right-content__bottom__title">
                <Space style={{ marginBottom: "1rem" }}>
                  <AlertOutlined style={{ fontSize: "1rem" }} />
                  <Title level={5} style={{ marginBottom: 0, lineHeight: 0 }}>
                    Activity Feed
                  </Title>
                </Space>
              </div>
              <div className="right-content__bottom__feeds">
                <ActivityFeed />
                <ActivityFeed />
                <ActivityFeed />
                <ActivityFeed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
