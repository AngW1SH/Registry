import { FC, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  PointElement,
  LineElement,
  Filler,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { generateGraphData } from "../utils/generateGraphData";
import { Commits } from "../../Commits";

ChartJS.register(
  CategoryScale,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Title
);

interface GraphProps {
  data: Commits;
}

export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  lineTension: 0.4,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
      },
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
  elements: {
    point: {
      radius: 0,
    },
  },
};

const Graph: FC<GraphProps> = ({ data }) => {
  const ref: any = useRef();

  const { labels, values } = generateGraphData(data);

  const context = ref?.current?.canvas?.getContext("2d");

  const gradient = context?.createLinearGradient(0, 0, 0, 160);
  gradient?.addColorStop(0, "rgba(85, 31, 255, 0.7)");
  gradient?.addColorStop(1, "rgba(85, 31, 255, 0)");

  const formattedData: any = {
    labels: labels,
    datasets: [
      {
        label: "Commits",
        data: values,
        fill: "start",
        backgroundColor: gradient,
        hidden: false,
        borderColor: "rgb(85, 31, 255)",
        borderWidth: 1,
        borderSkipped: false,
        datalabels: {
          display: false,
        },
      },
    ],
  };

  return (
    <div className="relative h-40">
      <Line
        ref={ref}
        plugins={[ChartDataLabels]}
        data={formattedData}
        options={options}
      />
    </div>
  );
};

export default Graph;
