import { FC } from "react";
import { IProject, ProjectStage } from "../types/types";
import { getProjectStage } from "../utils/getProjectStage";
import Image from "next/image";
import { monthShortNames } from "@/shared/static";

interface ProjectCardWithStatusProps {
  project: IProject;
}

const ProjectCardWithStatus: FC<ProjectCardWithStatusProps> = ({ project }) => {
  const stage = getProjectStage(project);
  return (
    <div className="flex">
      <div className="flex flex-col items-center sm:flex-row">
        <div className="flex">
          {stage == ProjectStage.completed && (
            <div className="group relative h-10 w-10 cursor-pointer bg-[#f7eeed] sm:ml-0">
              <Image src="/project-status-done-icon.svg" alt="" fill={true} />
              <p className="absolute right-[calc(100%+0.75rem)] top-[calc(50%-1.25rem)] hidden h-10 w-max rounded-sm border border-[#a1a1a1] bg-white px-5 pb-3 pt-2 text-[#616161] shadow-sm after:absolute after:left-[100%] after:top-1/2 after:-ml-[4px] after:h-[8px] after:w-[8px] after:-translate-y-1/2 after:rotate-45 after:border after:border-transparent after:border-r-[#a1a1a1] after:border-t-[#a1a1a1] after:bg-white after:shadow-center-lg group-hover:block">
                Проект выполнен
              </p>
            </div>
          )}
          {stage == ProjectStage.active && (
            <div className="group relative h-10 w-10 cursor-pointer bg-[#e0efef] sm:ml-0">
              <Image src="/project-status-active-icon.svg" alt="" fill={true} />
              <p className="absolute right-[calc(100%+0.75rem)] top-[calc(50%-1.25rem)] hidden h-10 w-max rounded-sm border border-[#a1a1a1] bg-white px-5 pb-3 pt-2 text-[#616161] shadow-sm after:absolute after:left-[100%] after:top-1/2 after:-ml-[4px] after:h-[8px] after:w-[8px] after:-translate-y-1/2 after:rotate-45 after:border after:border-transparent after:border-r-[#a1a1a1] after:border-t-[#a1a1a1] after:bg-white after:shadow-center-lg group-hover:block">
                Проект сейчас выполняется
              </p>
            </div>
          )}
          {stage == ProjectStage.hiring && (
            <div className="group relative h-10 w-10 cursor-pointer bg-[#fff] sm:ml-0">
              <Image src="/project-status-hiring-icon.svg" alt="" fill={true} />
              <p className="absolute right-[calc(100%+0.75rem)] top-[calc(50%-1.25rem)] hidden h-10 w-max rounded-sm border border-[#a1a1a1] bg-white px-5 pb-3 pt-2 text-[#616161] shadow-sm after:absolute after:left-[100%] after:top-1/2 after:-ml-[4px] after:h-[8px] after:w-[8px] after:-translate-y-1/2 after:rotate-45 after:border after:border-transparent after:border-r-[#a1a1a1] after:border-t-[#a1a1a1] after:bg-white after:shadow-center-lg group-hover:block">
                На проект идёт набор
              </p>
            </div>
          )}
        </div>
        <div className="pr-6" />
        <div className="flex w-14 flex-col items-center whitespace-nowrap pt-2 text-xs font-bold sm:items-start">
          <span className="block text-[1.375rem]">
            {project.dateStart.toLocaleDateString("ru-RU", { day: "2-digit" })}
          </span>
          <span className="text-xs">
            {monthShortNames[project.dateStart.getMonth()]}{" "}
            {project.dateStart.getFullYear()}
          </span>
        </div>
      </div>

      <div className="pr-5" />
      <div>
        <h3 className="font-[1.0625rem]">{project.name}</h3>
      </div>
    </div>
  );
};

export default ProjectCardWithStatus;
