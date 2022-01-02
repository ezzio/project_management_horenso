import React from "react";
import { Row, Typography, Space, Col } from "antd";
import "antd/dist/antd.css";
import "./Dashboard.scss";
import TaskChart from "./TaskChart/TaskChart";
import KanbanChart from "./KanbanChart/KanbanChart";
import TimelineChart from "./Timeline/Timeline";
import GrantChart from "./GrantChart/GrantChart";

const { Title } = Typography;
const Dashboard = () => {
  return (
    <div className="ctn dashboard">
      <Title level={1}>Dashboard</Title>

      <Row gutter={[8, 8]}>
        <div className="circle_chart">
          <Space size="large">
            <div className="circle_chart_box">
              <Title level={4} className="circle_chart_title">
                Task Chart
              </Title>
              <div className="circle_chart_item">
                <TaskChart />
              </div>
            </div>
            <div className="circle_chart_box">
              <Title level={4} className="circle_chart_title">
                Kanban Chart
              </Title>
              <div className="circle_chart_item">
                <KanbanChart />
              </div>
            </div>
          </Space>
        </div>

        <div className="timeline">
          <Title level={4} className="timeline_title">
            Project Timeline
          </Title>
          <TimelineChart className="timeline_item" />
        </div>
      </Row>
      <Row>
        <div className="gantt-chart">
          <Title level={4} className="gantt-chart_title">
            Grantt Chart
          </Title>
          <GrantChart className="gantt-chart_item" />
        </div>
      </Row>
    </div>
  );
};
export default Dashboard;
