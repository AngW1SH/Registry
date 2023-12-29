import { FC, ReactNode } from "react";
import { IProject } from "../types/types";
import { monthShortNames } from "@/shared/static";
import Link from "next/link";

interface ProjectCardAltProps {
  className?: string;
  tags?: ReactNode;
  project: IProject;
}

const ProjectCardAlt: FC<ProjectCardAltProps> = ({
  className = "",
  tags,
  project,
}) => {
  //border-r border-t border-black p-3
  return (
    <Link href={"/projects/" + project.id}>
      <div className={"flex flex-col " + className}>
        <div className="flex justify-between">
          <div className="w-15 whitespace-nowrap text-xs font-bold">
            <div className="pt-1" />
            <span className="block text-3xl">
              {project.dateStart.toLocaleDateString("ru-RU", {
                day: "2-digit",
              })}
            </span>
            {monthShortNames[project.dateStart.getMonth()]}{" "}
            {project.dateStart.getFullYear()}
          </div>
          <div className="pr-7" />
          <div>
            <h2 className="text-sm font-medium">{project.name}</h2>
          </div>
        </div>
        {tags && (
          <>
            <div className="pt-5 xl:pt-10" />
            <div>{tags}</div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ProjectCardAlt;
