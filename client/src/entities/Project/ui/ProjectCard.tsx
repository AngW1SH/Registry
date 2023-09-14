import { Block } from "@/shared/ui";
import { FC, ReactNode } from "react";

interface ProjectCardProps {
  className?: string;
  tags?: ReactNode;
}

const ProjectCard: FC<ProjectCardProps> = ({ className = "", tags }) => {
  return (
    <Block className={"rounded-lg px-8 pb-5 pt-10 " + className}>
      <div className="flex justify-between">
        <div className="whitespace-nowrap text-xs font-bold">
          <div className="pt-1" />
          <span className="block text-3xl">09</span>
          сен 2023
        </div>
        <div className="pr-7" />
        <div>
          <h2 className="text-xl font-semibold">
            ГМО: история, достижения, социальные и экологические риски
          </h2>
          <div className="pt-11" />
          <div className="flex text-sm text-[#696a6d]">
            <div className="border-l border-[#a1a1a1] px-8 pl-4">
              <h3>
                Срок реализации
                <br />
                проекта
              </h3>
              <div className="pt-2" />
              <p>09.09.2023</p>
            </div>
            <div className="border-l border-[#a1a1a1] pl-4">
              <h3>Руководитель</h3>
              <div className="pt-2" />
              <p>Иванов П.М.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10" />
      {tags && <div>{tags}</div>}
    </Block>
  );
};

export default ProjectCard;
