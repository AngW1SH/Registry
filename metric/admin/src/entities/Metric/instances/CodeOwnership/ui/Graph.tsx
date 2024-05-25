import { FC } from "react";

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CodeOwnershipData } from "../types";

ChartJS.register(ArcElement, Tooltip);

interface GraphProps {
  data: CodeOwnershipData;
}

const backgroundColors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 39, 100, 0.2)",
];

const borderColors = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(255, 39, 100, 1)",
];

const Graph: FC<GraphProps> = ({ data }) => {
  const options = {
    aspectRatio: 1.5,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed;

            return `${(value * data.global.lines).toFixed(0)} lines - ${(
              value * 100
            ).toFixed(0)}%`;
          },
        },
      },
    },
  };

  const displayData = {
    labels: data.items.map((item) => item.user),
    datasets: [
      {
        label: "User Contribution",
        data: data.items.map((item) => item.lines / data.global.lines),
        backgroundColor: data.items.map(
          (_, index) => backgroundColors[index % 7]
        ),
        borderColor: data.items.map((_, index) => borderColors[index % 7]),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <Doughnut data={displayData} options={options} />
    </div>
  );
};

export default Graph;
