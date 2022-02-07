import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
const LinePlot = ({ converToLinePlotChart }) => {
  const data = [
    ...converToLinePlotChart,
    {
      progress: 100,
    },
  ];
  const config = {
    data: data,
    xField: 'time',
    yField: 'progress',
    seriesField: 'title',
    xAxis: {
      type: 'time',
    },
    yAxis: {
      label: {
        formatter: (v) => `${v}%`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  return <Line {...config} className="line-plot" />;
};

export default LinePlot;
