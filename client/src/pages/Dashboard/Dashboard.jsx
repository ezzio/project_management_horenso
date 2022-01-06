import React from "react";
import { Typography, Empty } from "antd";
import "antd/dist/antd.css";
import "./Dashboard.scss";
import TaskChart from "./TaskChart/TaskChart";
import KanbanChart from "./KanbanChart/KanbanChart";
import TimelineChart from "./Timeline/Timeline";
import GanttChart from "./GanttChart/GanttChart";

const { Title } = Typography;
const Dashboard = () => {
  const taskData = [
    {
      type: "Reviewing",
      value: 50,
    },
    {
      type: "Completed",
      value: 25,
    },
    {
      type: "Over Deadline",
      value: 25,
    },
  ];

  const kanbanData = [
    {
      type: "Incompleted",
      value: 50,
    },
    {
      type: "Completed",
      value: 25,
    },
  ];
  // null;

  const timelineData = [
    {
      id: 1,
      label: "2015-09-01",
      content: "Create a services",
    },
    {
      id: 2,
      label: "2015-09-01 09:12:11",
      content: "Solve initial network problems",
    },
    {
      id: 3,
      label: "2015-09-01 09:12:11",
      content: "Network problems being solved",
    },
    {
      id: 4,
      label: "2015-09-01 09:12:11",
      content: "Network problems being solved",
    },
    {
      id: 5,
      label: "2015-09-01 09:12:11",
      content: "Network problems being solved",
    },
  ];
  return (
    <div className="ctn dashboard">
      <Title level={1}>Dashboard</Title>

      <div className="comparition-chart">
        <div className="comparition-chart__circle-chart__box">
          <Title level={4} className="comparition-chart__circle-chart__title">
            Task Chart
          </Title>
          <div className="comparition-chart__circle-chart__item">
            {taskData === null ? (
              <Empty style={{ padding: "2rem 0 0 2rem" }} />
            ) : (
              <TaskChart data={taskData} />
            )}
          </div>
        </div>
        <div className="comparition-chart__circle-chart__box">
          <Title level={4} className="comparition-chart__circle-chart__title">
            Job Chart
          </Title>
          <div className="comparition-chart__circle-chart__item">
            {kanbanData === null ? (
              <Empty style={{ padding: "2rem 0 0 2rem" }} />
            ) : (
              <KanbanChart data={kanbanData} />
            )}
          </div>
        </div>

        <div className="comparition-chart__timeline">
          <Title level={4} className="comparition-chart__timeline__title">
            Project Timeline
          </Title>
          {timelineData === null ? (
            <Empty style={{ padding: "2rem 0 0 2rem" }} />
          ) : (
            <TimelineChart
              className="comparition-chart__timeline__item"
              data={timelineData}
            />
          )}
        </div>
      </div>

      <div className="gantt-chart">
        <Title level={4} className="gantt-chart__title">
          Gantt Chart
        </Title>
        <GanttChart className="gantt-chart__item" />
      </div>
    </div>
  );
};
export default Dashboard;
