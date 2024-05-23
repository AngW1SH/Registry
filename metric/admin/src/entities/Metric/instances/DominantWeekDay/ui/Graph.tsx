import { FC } from "react";
import { Commits } from "../../Commits";
import { PullRequests } from "../../PullRequests";
import { Issues } from "../../Issues";
import { generateGraphData } from "../utils/generateGraphData";

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

interface GraphProps {
  data: {
    commits: Commits;
    pullRequests: PullRequests;
    issues: Issues;
  };
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
  const structuredData = generateGraphData(data);

  const displayData = {
    labels: structuredData.map((item) => item.label),
    datasets: [
      {
        label: "Commits/Issues/Pull Requests",
        data: structuredData.map((item) => item.data),
        backgroundColor: structuredData.map((item) => item.backgroundColor),
        borderColor: structuredData.map((item) => item.borderColor),
        borderWidth: 1,
      },
    ],
  };

  console.log(displayData);

  return (
    <div className="p-4">
      <Doughnut data={displayData} options={options} />
    </div>
  );
};

export default Graph;
