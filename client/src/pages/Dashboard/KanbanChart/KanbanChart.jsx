import { Pie } from "@ant-design/charts";

const KanbanChart = ({ data }) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    color: ({ type }) => {
      if (type === "Incompleted") {
        return "#ea9010";
      }
      return "#09814a";
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
        fontWeight: 600,
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
        content: "Job",
      },
    },
  };
  return <Pie {...config} />;
};
export default KanbanChart;
