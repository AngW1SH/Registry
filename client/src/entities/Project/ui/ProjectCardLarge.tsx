import { FC, ReactNode } from "react";
import { IProject } from "../types/types";
import { monthShortNames } from "@/shared/static";
import Image from "next/image";

interface ProjectCardLargeProps {
  className?: string;
  tags?: ReactNode;
  project: IProject;
}

const ProjectCardLarge: FC<ProjectCardLargeProps> = ({
  className,
  tags,
  project,
}) => {
  return (
    <div
      className={
        "relative rounded-lg pb-5 pl-2 pr-11 pt-10 sm:pl-8 lg:pr-8 " + className
      }
    >
      <div className="flex flex-col lg:flex-row">
        <div className="flex w-14 items-end whitespace-nowrap font-bold lg:flex-col lg:items-start lg:text-xs">
          <div className="pt-1" />
          <span className="block text-3xl">
            {project.dateStart.toLocaleDateString("ru-RU", { day: "2-digit" })}
          </span>
          <span className="pb-[0.05rem] pl-2 lg:pl-0">
            {monthShortNames[project.dateStart.getMonth()]}{" "}
            {project.dateStart.getFullYear()}
          </span>
        </div>
        <div className="pb-5 pr-10" />
        <div className="w-full">
          <h2 className="text-2xl font-semibold xl:text-3xl">{project.name}</h2>
          <div className="pt-4 sm:pt-6" />
        </div>
        <div className="static right-10 top-14 flex min-w-[30%] flex-col justify-start sm:absolute sm:flex-row sm:justify-center lg:static">
          <h3 className="font-semibold">IT-клиника</h3>
          <div className="pt-2" />
        </div>
      </div>
      <div className="lg:max-w-[70%] xl:pl-[96px]">
        <p className=" text-sm">{project.description}</p>
        <div className="pt-8" />
      </div>
      <div className="flex flex-col text-sm font-medium sm:flex-row lg:max-w-[70%] lg:pl-0 xl:pl-[96px] xl:text-base">
        <div className="flex w-full flex-row items-center justify-between border-black py-1 sm:flex-col sm:items-start sm:border-l sm:pl-4 lg:border-l-0 lg:pl-0 xl:border-l xl:pl-4">
          <h3 className="leading-5">
            Срок записи
            <br className="sm:block" />
            на проект
          </h3>
          <div className="pt-2" />
          <p>
            {project.enrollmentEnd.toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex w-full flex-row items-center justify-between border-black py-1 sm:flex-col sm:items-start sm:border-l sm:pl-4">
          <h3 className="leading-5">
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
        <div className="flex w-full flex-row items-center justify-between border-black py-1 sm:flex-col sm:items-start sm:border-l sm:pl-4">
          <h3 className="leading-5">Руководитель</h3>
          <div className="pt-2" />
          <p>{project.supervisor}</p>
        </div>
      </div>
      <div className="pt-10" />
      {tags && <div className="xl:pl-[96px] ">{tags}</div>}
      <div className="absolute right-0 top-10 flex sm:top-10 sm:flex-col">
        <div className="group relative mb-3 ml-3 h-10 w-10 cursor-pointer bg-[#f7eeed] sm:ml-0">
          <Image src="/project-status-done-icon.svg" alt="" fill={true} />
          <p className="absolute right-[calc(100%+0.75rem)] top-[calc(50%-1.25rem)] hidden h-10 w-max rounded-sm border border-[#a1a1a1] bg-white px-5 pb-3 pt-2 text-[#616161] shadow-sm after:absolute after:left-[100%] after:top-1/2 after:-ml-[4px] after:h-[8px] after:w-[8px] after:-translate-y-1/2 after:rotate-45 after:border after:border-transparent after:border-r-[#a1a1a1] after:border-t-[#a1a1a1] after:bg-white after:shadow-center-lg group-hover:block">
            Проект выполнен
          </p>
        </div>
        <div className="group relative mb-3 ml-3 h-10 w-10 cursor-pointer bg-[#e0efef] sm:ml-0">
          <Image src="/project-status-active-icon.svg" alt="" fill={true} />
          <p className="absolute right-[calc(100%+0.75rem)] top-[calc(50%-1.25rem)] hidden h-10 w-max rounded-sm border border-[#a1a1a1] bg-white px-5 pb-3 pt-2 text-[#616161] shadow-sm after:absolute after:left-[100%] after:top-1/2 after:-ml-[4px] after:h-[8px] after:w-[8px] after:-translate-y-1/2 after:rotate-45 after:border after:border-transparent after:border-r-[#a1a1a1] after:border-t-[#a1a1a1] after:bg-white after:shadow-center-lg group-hover:block">
            Проект сейчас выполняется
          </p>
        </div>
        <div className="group relative mb-3 ml-3 h-10 w-10 cursor-pointer bg-[#fff] sm:ml-0">
          <Image src="/project-status-hiring-icon.svg" alt="" fill={true} />
          <p className="absolute right-[calc(100%+0.75rem)] top-[calc(50%-1.25rem)] hidden h-10 w-max rounded-sm border border-[#a1a1a1] bg-white px-5 pb-3 pt-2 text-[#616161] shadow-sm after:absolute after:left-[100%] after:top-1/2 after:-ml-[4px] after:h-[8px] after:w-[8px] after:-translate-y-1/2 after:rotate-45 after:border after:border-transparent after:border-r-[#a1a1a1] after:border-t-[#a1a1a1] after:bg-white after:shadow-center-lg group-hover:block">
            На проект идёт набор
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardLarge;
