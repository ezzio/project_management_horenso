import React from "react";
import { Pie } from "@ant-design/plots";

const JobStatus = () => {
  const data = [
    {
      type: "Backlogs",
      value: 27,
    },
    {
      type: "In progress",
      value: 25,
    },
    {
      type: "In review",
      value: 18,
    },
    {
      type: "Completed",
      value: 15,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} className="pie-chart" />;
};

export default JobStatus;
