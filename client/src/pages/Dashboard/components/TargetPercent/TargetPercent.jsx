import React from 'react';
import { Gauge } from '@ant-design/plots';

const TargetPercent = ({ targetPercent }) => {
  const config = {
    percent:
      targetPercent === 0 || isNaN(targetPercent)
        ? 0.00001
        : targetPercent / 100,
    range: {
      color: 'l(0) 0:#B8E1FF 1:#3D76DD',
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: null,
    statistic: {
      title: {
        offsetY: -36,
        style: {
          fontSize: '36px',
          color: '#4B535E',
        },
        formatter: () => `${isNaN(targetPercent) ? 0 : targetPercent}%`,
      },
      content: {
        style: {
          fontSize: '24px',
          lineHeight: '44px',
          color: '#4B535E',
        },
        formatter: () =>
          targetPercent === 0 || isNaN(targetPercent)
            ? 'Keep going 🚀'
            : 'Good job ✅',
      },
    },
  };
  return <Gauge {...config} className="gauge-plots" />;
};

export default TargetPercent;
