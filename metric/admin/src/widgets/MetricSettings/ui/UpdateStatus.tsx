import { FC, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface UpdateStatusProps {}

const labels = ["Feb", "Mar", "Apr", "May", "Jun"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Successful",
      data: [1, 3, 4, 2, 2],
      backgroundColor: "#5CC940",
      borderColor: "#5CC940",
      borderWidth: 1,
    },
    {
      label: "Failed",
      data: [1, 1, 0, 2, 0],
      backgroundColor: "#C61010",
      borderColor: "#C61010",
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  barThickness: 14,
  borderRadius: 7,
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
    },
    y: {
      stacked: true,
      ticks: {
        stepSize: 1,
        font: {
          size: 15,
        },
        color: "#A3AED0",
      },
      border: {
        dash: [2, 3],
      },
      grid: {
        color: "#8A8A8A",
      },
    },
  },
};

const UpdateStatus: FC<UpdateStatusProps> = () => {
  const ref = useRef();

  return (
    <div>
      <h3 className="text-[#A3AED0] text-lg">Update Status</h3>
      <div className="pt-8"></div>
      <Bar ref={ref} data={data} options={options} />
    </div>
  );
};

export default UpdateStatus;
