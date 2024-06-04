import { FC, useEffect, useRef, useState } from "react";
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
import { groupData } from "../utils/generateGraphData";
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
      display: false,
    },
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

  const test = groupData(data, 7);

  const formattedData = {
    labels: test.map((item) => item.label),
    datasets: [
      {
        label: "Commits",
        data: test.map((item) => item.data),
        fill: "start",
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

  const [gradient, setGradient] = useState<any>(null);

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current?.canvas?.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, 160);
      gradient.addColorStop(0, "rgba(85, 31, 255, 0.5)");
      gradient.addColorStop(1, "rgba(85, 31, 255, 0)");
      setGradient(gradient);
    }
  }, [ref.current]);

  return (
    <div className="relative h-40">
      <Line
        ref={ref}
        plugins={[ChartDataLabels]}
        data={{
          ...formattedData,
          datasets: [
            {
              ...formattedData.datasets[0],
              backgroundColor: gradient,
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

export default Graph;
