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
        <p className="w-1/3 text-sm text-[#848689] xl:w-1/5">Заказчик</p>
        <p>{project.client}</p>
      </li>
      <li className="flex items-center bg-[#f4f4f4] px-4 py-5">
        <p className="w-1/3 text-sm text-[#848689] xl:w-1/5">Контакты</p>
        <p>{project.clientContact}</p>
      </li>
      <li className="flex items-center bg-[#f4f4f4] px-4 py-5">
        <p className="w-1/3 text-sm text-[#848689] xl:w-1/5">Куратор</p>
        <p>{project.curator}</p>
      </li>
    </ul>
  );
};

export default Supervisors;
