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
        <div className="comparition-chart">
          <Space size="large">
            <div className="comparition-chart__circle-chart__box">
              <Title
                level={4}
                className="comparition-chart__circle-chart__title"
              >
                Task Chart
              </Title>
              <div className="comparition-chart__circle-chart__item">
                <TaskChart />
              </div>
            </div>
            <div className="comparition-chart__circle-chart__box">
              <Title
                level={4}
                className="comparition-chart__circle-chart__title"
              >
                Kanban Chart
              </Title>
              <div className="comparition-chart__circle-chart__item">
                <KanbanChart />
              </div>
            </div>
            <div className="comparition-chart__timeline">
              <Title level={4} className="comparition-chart__timeline__title">
                Project Timeline
              </Title>
              <TimelineChart className="comparition-chart__timeline__item" />
            </div>
          </Space>
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
