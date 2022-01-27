import React from 'react';
import { DecompositionTreeGraph } from '@ant-design/graphs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
const TreeChart = () => {
  const jobs = useSelector((state) => state.dashboard.jobs);
  const nameProject = useSelector((state) => state.dashboard.nameProject);
  const createAtProject = useSelector(
    (state) => state.dashboard.createAtProject
  );
  const { idProject } = useParams();

  const nest = (items, id = null, link = 'parent') =>
    items
      .filter((item) => item[link] === id)
      .map((item) => ({
        id: item._id,
        value: {
          title: item.title,
          items: [
            {
              text: 'Progress: ',
              value: `${item.progess}%`,
            },
          ],
        },
        children: nest(items, item._id),
      }));

  const dataTree = nest(jobs);
  const data = {
    id: 'root',
    value: {
      title: nameProject,
      items: [
        {
          text: 'Create at: ',
          value: moment(createAtProject).format('YYYY-MM-DD'),
        },
      ],
    },
    children: dataTree,
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
