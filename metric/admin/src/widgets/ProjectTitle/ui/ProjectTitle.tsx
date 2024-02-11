import { FC } from "react";

interface ProjectTitleProps {
  children: string;
  hint?: string;
}

const ProjectTitle: FC<ProjectTitleProps> = ({ children, hint }) => {
  return (
    <>
      <h1 className="font-semibold text-3xl text-[#404040]">{children}</h1>
      {!!hint && <p className="text-[#AEAEAE] mt-1">{hint}</p>}
    </>
  );
};

export default ProjectTitle;
