import { StartTask } from "@/features/Temp/Task";
import { FC } from "react";

interface TaskProps {
  name: string;
  metric: string;
  className?: string;
}

const Task: FC<TaskProps> = ({ name, metric, className = "" }) => {
  return (
    <div className={"bg-background p-10 rounded-lg " + className}>
      <h3 className="font-semibold text-3xl text-[#2B3674]">{name}</h3>
      <div className="mt-5">
        <StartTask metric={metric} />
      </div>
    </div>
  );
};

export default Task;
