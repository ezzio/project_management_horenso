import React from 'react';
import { DecompositionTreeGraph } from '@ant-design/graphs';
const TreeChart = () => {
  const data = {
    id: 'A0',
    value: {
      title:
        'Build a project management application for student it base on Kanban and Horenso',
      items: [
        {
          text: 'Progress',
          value: '30%',
        },
      ],
    },
    children: [
      {
        id: 'A1',
        value: {
          title: 'Build UX/UI',
          items: [
            {
              text: 'Progress',
              value: '30%',
            },
          ],
        },
        children: [
          {
            id: 'A11',
            value: {
              title: 'This is task',
              items: [
                {
                  text: 'Progress',
                  value: '40%',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'A2',
        value: {
          title: 'Handle event',
          items: [
            {
              text: 'Progress',
              value: '30%',
            },
          ],
        },
      },
    ],
  };

  const config = {
    data,
    autoFit: true,
    layout: {
      getHeight: () => {
        return 250;
      },
    },
    markerCfg: (cfg) => {
      const { children } = cfg;
      return {
        show: children?.length,
      };
    },
    nodeCfg: {
      autoWidth: true,
      items: {
        layout: 'follow',
      },
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
  };

  return <DecompositionTreeGraph {...config} className={'tree-chart'} />;
};

export default TreeChart;
