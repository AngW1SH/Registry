import { IProject } from "@/entities/Project";
import { FC } from "react";

interface SupervisorsProps {
  className?: string;
  project: IProject;
}

const Supervisors: FC<SupervisorsProps> = ({ project, className = " " }) => {
  return (
    <ul className={"flex flex-col gap-1 " + className}>
      <li className="flex items-center bg-[#f4f4f4] px-4 py-5">
        <p className="w-1/5 text-sm text-[#848689]">Заказчик</p>
        <p>{project.client}</p>
      </li>
      <li className="flex items-center bg-[#f4f4f4] px-4 py-5">
        <p className="w-1/5 text-sm text-[#848689]">Куратор</p>
        <p>{project.curator}</p>
      </li>
      <li className="flex items-center bg-[#f4f4f4] px-4 py-5">
        <p className="w-1/5 text-sm text-[#848689]">Руководитель</p>
        <p>{project.supervisor}</p>
      </li>
    </ul>
  );
};

export default Supervisors;
