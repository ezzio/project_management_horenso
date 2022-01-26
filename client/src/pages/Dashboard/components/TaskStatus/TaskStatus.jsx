import React from 'react';
import { Pie } from '@ant-design/plots';

const TaskStatus = (props) => {
  const { backlogs, inProgress, inPreview, completed } = props;
  const data = [
    {
      type: 'Backlogs',
      value: backlogs.length,
    },
    {
      type: 'In progress',
      value: inProgress.length,
    },
    {
      type: 'In review',
      value: inPreview.length,
    },
    {
      type: 'Completed',
      value: completed.length,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} className="pie-chart" />;
};

export default TaskStatus;
