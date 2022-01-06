import { Pie } from "@ant-design/charts";

const TaskChart = ({ data }) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    color: ({ type }) => {
      if (type === "Over Deadline") {
        return "hsl(357, 96%, 60%)";
      } else if (type === "Completed") {
        return "#09814a";
      } else {
        return "#ea9010";
      }
    },
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 16,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "24px",
        },
        content: "Task",
      },
    },
  };
  return <Pie {...config} />;
};
export default TaskChart;
