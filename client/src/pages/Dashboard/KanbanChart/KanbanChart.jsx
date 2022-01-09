import { Pie } from "@ant-design/charts";

const KanbanChart = () => {
  const data = [
    {
      type: "Total",
      value: 5,
    },
    {
      type: "Completed",
      value: 2,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
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
        content: "Kanban",
      },
    },
  };
  return <Pie {...config} />;
};
export default KanbanChart;