import { useState } from "react";
import { Timeline } from "antd";

const TimelineChart = ({ data }) => {
  return (
    <>
      <Timeline mode="left">
        {data.map((item) => (
          <Timeline.Item key={item.id} label={item.label}>
            {item.content}
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
};
export default TimelineChart;
