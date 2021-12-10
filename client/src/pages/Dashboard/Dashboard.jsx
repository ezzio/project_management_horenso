import React from "react";
import { Typography } from "antd";
import "antd/dist/antd.css";
import "./Dashboard.scss";
import TaskChart from "./TaskChart/TaskChart";
import KanbanChart from "./KanbanChart/KanbanChart";
import TimelineChart from "./Timeline/Timeline";

const { Title } = Typography;
const Dashboard = () => {
  return (
    <div className="ctn dashboard">
      <Title level={1}>Dashboard</Title>
      <div className="timeline">
        <Title level={4} className="timeline_title">
          Project Timeline
        </Title>
        <TimelineChart className="timeline_item" />
      </div>

      <div className="circle_chart">
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
      </div>
    </div>
  );
};
export default Dashboard;
