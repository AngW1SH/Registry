import { FC, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { groupData } from "../utils/generateGraphData";
import { Issues } from "../../Issues";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface GraphProps {
  data: Issues;
}

export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  barThickness: 14,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
      stacked: true,
    },
    y: {
      display: false,
      stacked: true,
    },
  },
  legend: {
    display: false,
  },
  plugins: {
    tooltip: {
      filter: function (tooltipItem: any) {
        return tooltipItem.datasetIndex !== 2;
      },
    },
  },
  layout: {
    padding: {
      top: 40,
    },
  },
};

const Graph: FC<GraphProps> = ({ data }) => {
  const ref = useRef();

  const formatData = groupData(data, 7);

  const max = Math.max(
    ...formatData.map((item) => {
      return Math.max(item.data.opened + (item.data.closed || 0));
    })
  );

  const layoutValues = formatData.map(
    (item) => max - item.data.opened - (item.data.closed || 0)
  );

  const formattedData: any = {
    labels: formatData.map((item) => item.label),
    datasets: [
      {
        label: "Opened",
        stack: "stack",
        data: formatData.map((item) => item.data.opened || null),
        backgroundColor: "#551FFF",
        borderColor: "#551FFF",
        borderWidth: 1,
        borderRadius: 20,
        datalabels: {
          display: false,
        },
      },
      {
        label: "Closed",
        stack: "stack",
        data: formatData.map((item) => item.data.closed || null),
        backgroundColor: "#9e85ee",
        borderColor: "#9e85ee",
        borderWidth: 1,
        borderRadius: 20,
        datalabels: {
          display: false,
        },
      },
      {
        label: "Layout",
        data: layoutValues,
        stack: "stack",
        backgroundColor: "#E9EDF7",
        borderColor: "#E9EDF7",
        borderWidth: 1,
        borderRadius: 20,
        datalabels: {
          formatter: function (_: any, context: any) {
            return (
              formatData[context.dataIndex].data.opened +
              "/" +
              (formatData[context.dataIndex].data?.closed || 0)
            );
          },
          color: "#B0BBD5",
          align: "top",
          anchor: "end",
          font: {
            weight: "bold",
          },
        },
      },
    ],
  };

  return (
    <div className="relative h-40">
      <Bar
        ref={ref}
        plugins={[ChartDataLabels]}
        data={formattedData}
        options={options}
      />
    </div>
  );
};

export default Graph;
