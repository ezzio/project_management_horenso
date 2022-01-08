import React from "react";
import { Liquid } from "@ant-design/plots";
const ProcessChart = () => {
  const config = {
    autoFit: true,
    percent: 0.5,
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
