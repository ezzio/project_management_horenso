import React from "react";
import { Liquid } from "@ant-design/plots";
const ProcessChart = ({ data }) => {
  const config = {
    autoFit: true,
    percent: data,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
  };
  return <Liquid {...config} />;
};

export default ProcessChart;
