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
    <div className={"relative rounded-lg px-8 pb-5 pt-10 " + className}>
      <div className="flex">
        <div className="w-14 whitespace-nowrap text-xs font-bold">
          <div className="pt-1" />
          <span className="block text-3xl">
            {project.dateStart.toLocaleDateString("ru-RU", { day: "2-digit" })}
          </span>
          {monthShortNames[project.dateStart.getMonth()]}{" "}
          {project.dateStart.getFullYear()}
        </div>
        <div className="pr-10" />
        <div className="w-full">
          <h2 className="text-3xl font-semibold">{project.name}</h2>
          <div className="pt-3" />
          <p className=" text-sm">{project.description}</p>
          <div className="pt-11" />
        </div>
        <div className="flex min-w-[30%] justify-center">
          <h3 className="font-semibold">IT-клиника</h3>
        </div>
      </div>
      <div className="flex max-w-[70%] font-medium sm:pl-[83px] lg:pl-0 xl:pl-[96px]">
        <div className="flex  w-full flex-col justify-between border-black py-1 pr-8 sm:border-l sm:pl-4 lg:border-l-0 lg:pl-0 xl:border-l xl:pl-4">
          <h3 className="leading-5">
            Срок записи
            <br />
            на проект
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
        <div className="flex w-full flex-col justify-between border-l border-black px-4 py-1">
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
        <div className="flex  w-full flex-col justify-between border-l border-black py-1 pl-4">
          <h3 className="leading-5">Руководитель</h3>
          <div className="pt-2" />
          <p>{project.supervisor}</p>
        </div>
      </div>
      <div className="pt-10" />
      {tags && <div>{tags}</div>}
      <div className="absolute right-0 top-10">
        <div className="group relative mb-3 h-10 w-10 cursor-pointer bg-[#f7eeed]">
          <Image src="/project-status-done-icon.svg" alt="" fill={true} />
          <p className="absolute right-[calc(100%+0.75rem)] top-[calc(50%-1.25rem)] hidden h-10 w-max rounded-sm border border-[#a1a1a1] bg-white px-5 pb-3 pt-2 text-[#616161] shadow-sm after:absolute after:left-[100%] after:top-1/2 after:-ml-[4px] after:h-[8px] after:w-[8px] after:-translate-y-1/2 after:rotate-45 after:border after:border-transparent after:border-r-[#a1a1a1] after:border-t-[#a1a1a1] after:bg-white after:shadow-center-lg group-hover:block">
            Проект выполнен
          </p>
        </div>
        <div className="group relative mb-3 h-10 w-10 cursor-pointer bg-[#e0efef]">
          <Image src="/project-status-active-icon.svg" alt="" fill={true} />
          <p className="absolute right-[calc(100%+0.75rem)] top-[calc(50%-1.25rem)] hidden h-10 w-max rounded-sm border border-[#a1a1a1] bg-white px-5 pb-3 pt-2 text-[#616161] shadow-sm after:absolute after:left-[100%] after:top-1/2 after:-ml-[4px] after:h-[8px] after:w-[8px] after:-translate-y-1/2 after:rotate-45 after:border after:border-transparent after:border-r-[#a1a1a1] after:border-t-[#a1a1a1] after:bg-white after:shadow-center-lg group-hover:block">
            Проект сейчас выполняется
          </p>
        </div>
        <div className="group relative mb-3 h-10 w-10 cursor-pointer bg-[#fff]">
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
