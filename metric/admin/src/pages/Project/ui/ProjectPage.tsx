import { ProjectTitle } from "@/widgets/ProjectTitle";
import { FC } from "react";

interface ProjectPageProps {}

const ProjectPage: FC<ProjectPageProps> = () => {
  return (
    <div className="flex">
      <div className="w-full">
        <ProjectTitle hint={"Система управления проектами"}>
          Реестр проектов клинической практики СПбГУ
        </ProjectTitle>
      </div>
      <div className="min-w-[25%]"></div>
    </div>
  );
};

export default ProjectPage;
