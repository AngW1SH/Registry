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
import { CommitsPerDay } from "../types/validate";
import { generateGraphData } from "../utils/generateGraphData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface GraphProps {
  data: CommitsPerDay;
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
      stacked: true,
      ticks: {
        stepSize: 1,
        color: "#A3AED0",
      },
      font: {
        size: 14,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
      border: {
        display: false,
      },
    },
    // to remove the y-axis labels
    y: {
      display: false,
    },
  },
  legend: {
    display: false,
  },
  plugins: {
    tooltip: {
      filter: function (tooltipItem: any) {
        return tooltipItem.datasetIndex === 0;
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

  const { labels, values } = generateGraphData(data);

  const max = values.reduce((a, b) => Math.max(a, b), 0);
  const maxValues = values.map((_) => max);

  const formattedData: any = {
    labels: labels,
    datasets: [
      {
        label: "Commits",
        data: values,
        backgroundColor: "#551FFF",
        borderColor: "#551FFF",
        borderWidth: 1,
        borderRadius: 20,
        borderSkipped: false,
        datalabels: {
          display: false,
        },
      },
      {
        label: "Layout",
        data: maxValues,
        backgroundColor: "#E9EDF7",
        borderColor: "#E9EDF7",
        borderWidth: 1,
        borderRadius: 20,
        borderSkipped: false,
        datalabels: {
          formatter: function (_: any, context: any) {
            return values[context.dataIndex] || 0;
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
