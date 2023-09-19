import { Block } from "@/shared/ui";
import { FC, ReactNode } from "react";
import { IProject } from "../types/types";
import { monthShortNames } from "@/shared/static";

interface ProjectCardProps {
  className?: string;
  tags?: ReactNode;
  project: IProject;
}

const ProjectCard: FC<ProjectCardProps> = ({
  className = "",
  tags,
  project,
}) => {
  return (
    <Block className={"rounded-lg px-8 pb-5 pt-10 " + className}>
      <div className="flex justify-between">
        <div className="w-14 whitespace-nowrap text-xs font-bold">
          <div className="pt-1" />
          <span className="block text-3xl">
            {project.dateStart.toLocaleDateString("ru-RU", { day: "2-digit" })}
          </span>
          {monthShortNames[project.dateStart.getMonth()]}{" "}
          {project.dateStart.getFullYear()}
        </div>
        <div className="pr-7" />
        <div>
          <h2 className="text-xl font-semibold">{project.name}</h2>
          <div className="pt-11" />
        </div>
      </div>
      <div className="flex text-sm text-[#696a6d] sm:pl-[83px] lg:pl-0 xl:pl-[83px]">
        <div className="border-[#a1a1a1] pr-8 sm:border-l sm:pl-4 lg:border-l-0 lg:pl-0 xl:border-l xl:pl-4">
          <h3>
            Срок реализации
            <br />
            проекта
          </h3>
          <div className="pt-2" />
          <p>
            {project.dateEnd.toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="border-l border-[#a1a1a1] pl-4">
          <h3>Руководитель</h3>
          <div className="pt-2" />
          <p>{project.supervisor}</p>
        </div>
      </div>
      <div className="pt-10" />
      {tags && <div>{tags}</div>}
    </Block>
  );
};

export default ProjectCard;
