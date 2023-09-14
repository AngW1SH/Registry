import { FC, ReactNode } from "react";

interface ProjectCardAltProps {
  className?: string;
  tags?: ReactNode;
}

const ProjectCardAlt: FC<ProjectCardAltProps> = ({ className = "", tags }) => {
  return (
    <div className={"border-r border-t border-black p-3 " + className}>
      <div className="flex justify-between">
        <div className="whitespace-nowrap text-xs font-bold">
          <div className="pt-1" />
          <span className="block text-3xl">09</span>
          сен 2023
        </div>
        <div className="pr-7" />
        <div>
          <h2 className="text-sm font-medium">
            ГМО: история, достижения, социальные и экологические риски
          </h2>
          {tags && (
            <>
              <div className="pt-10" />
              <div>{tags}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCardAlt;
