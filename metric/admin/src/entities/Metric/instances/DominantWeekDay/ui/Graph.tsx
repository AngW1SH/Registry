import { FC } from "react";

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DominantWeekDayValue } from "../types";
import { backgroundColors, borderColors } from "../config";

ChartJS.register(ArcElement, Tooltip);

interface GraphProps {
  data: DominantWeekDayValue[];
}

export const options = {
  aspectRatio: 1.5,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
};

const Graph: FC<GraphProps> = ({ data }) => {
  const displayData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Commits/Issues/Pull Requests",
        data: data.map((item) => item.data),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
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
