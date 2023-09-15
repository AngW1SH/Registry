import { FC, ReactNode } from "react";

interface ProjectCardAltProps {
  className?: string;
  tags?: ReactNode;
  project: any;
}

const ProjectCardAlt: FC<ProjectCardAltProps> = ({
  className = "",
  tags,
  project,
}) => {
  //border-r border-t border-black p-3
  return (
    <div className={"flex flex-col " + className}>
      <div className="flex justify-between">
        <div className="w-15 whitespace-nowrap text-xs font-bold">
          <div className="pt-1" />
          <span className="block text-3xl">09</span>
          сен 2023
        </div>
        <div className="pr-7" />
        <div>
          <h2 className="text-sm font-medium">
            ГМО: история, достижения, социальные и экологические риски
          </h2>
        </div>
      </div>
      <div className="ml-auto sm:ml-0 xl:pl-20">
        {tags && (
          <>
            <div className="pt-5 xl:pt-10" />
            <div>{tags}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectCardAlt;
