import React from "react";
import Chart from "react-google-charts";

const GanttChart = () => {
  const ganttChartData = [
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ],
    [
      "Research",
      "Find sources",
      new Date(2021, 1, 1),
      new Date(2021, 3, 5),
      null,
      100,
      null,
    ],
    [
      "Write",
      "Write paper",
      null,
      new Date(2021, 5, 9),
      3 * 7 * 24 * 60 * 60 * 1000,
      70,
      "Research",
    ],
    [
      "Cite",
      "Create bibliography",
      null,
      new Date(2021, 5, 7),
      3 * 4 * 7 * 24 * 60 * 60 * 1000,
      20,
      "Research",
    ],
    [
      "Complete",
      "Hand in paper",
      null,
      new Date(2021, 9, 10),
      3 * 7 * 24 * 60 * 60 * 1000,
      0,
      "Cite,Write",
    ],
    [
      "Outline",
      "Outline paper",
      null,
      new Date(2021, 12, 6),
      3 * 7 * 24 * 60 * 60 * 1000,
      100,
      "Research",
    ],
  ];

  const options = {
    gantt: {
      criticalPathEnabled: false, // Critical path arrows will be the same as other arrows.
      arrow: {
        angle: 100,
        width: 5,
        color: "hsl(215, 92%, 64%)",
        radius: 0,
      },
    },
  };
  return (
    <div className="container">
      <Chart
        width="100"
        height="50vh"
        chartType="Gantt"
        loader={<div>Loading Chart</div>}
        data={ganttChartData}
        rootProps={{ "data-testid": "1" }}
        style={{ overflow: "auto" }}
        options={options}
      />
    </div>
  );
};

export default GanttChart;
