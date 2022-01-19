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
      time: '2022-01-02',
      progress: 12,
    },
    {
      title: 'Build UI/UX',
      time: '2022-01-03',
      progress: 8,
    },
    {
      title: 'Build UI/UX',
      time: '2022-01-04',
      progress: 100,
    },
    {
      title: 'Handle function',
      time: '2022-01-04',
      progress: 0,
    },
    {
      title: 'Handle function',
      time: '2022-01-05',
      progress: 33,
    },
    {
      title: 'Handle function',
      time: '2022-01-06',
      progress: 100,
    },
    {
      title: 'Tester',
      time: '2022-01-07',
      progress: 0,
    },
    {
      title: 'Tester',
      time: '2022-01-10',
      progress: 16,
    },
    {
      title: 'Writing report',
      time: '2022-01-05',
      progress: 0,
    },
    {
      title: 'Writing report',
      time: '2022-01-06',
      progress: 53,
    },
    {
      title: 'Writing report 1',
      time: '2022-02-05',
      progress: 0,
    },
    {
      title: 'Writing report 1',
      time: '2022-02-06',
      progress: 32,
    },
    {
      title: 'Writing report 2',
      time: '2022-03-05',
      progress: 0,
    },
    {
      title: 'Writing report 2',
      time: '2022-03-05',
      progress: 39,
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
