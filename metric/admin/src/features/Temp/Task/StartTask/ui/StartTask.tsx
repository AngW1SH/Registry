import { FC } from "react";
import { fetchStartTask } from "../api/fetchStartTask";

interface StartTaskProps {
  metric: string;
}

const StartTask: FC<StartTaskProps> = ({ metric }) => {
  const handleClick = async () => {
    fetchStartTask(metric);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-secondary text-primary font-medium px-10 py-3 text-center rounded-lg border border-primary"
    >
      Start Task
    </button>
  );
};

export default StartTask;
