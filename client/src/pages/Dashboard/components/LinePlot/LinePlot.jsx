import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
const LinePlot = () => {
  const data = [
    {
      title: 'Build UI/UX',
      time: '2022-01-01',
      progress: 0,
    },
    {
      title: 'Build UI/UX',
      time: '2022-01-05',
      progress: 57,
    },
    {
      title: 'Build UI/UX',
      time: '2022-01-07',
      progress: 12,
    },
    {
      title: 'Build UI/UX',
      time: '2022-01-10',
      progress: 100,
    },
  ];

  const config = {
    data,
    xField: 'time',
    yField: 'progress',
    seriesField: 'title',
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
