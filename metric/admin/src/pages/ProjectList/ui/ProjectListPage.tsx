import { ProjectList } from "@/widgets/ProjectList";
import { ProjectTitle } from "@/widgets/ProjectTitle";
import { FC } from "react";

interface ProjectListPageProps {}

const ProjectListPage: FC<ProjectListPageProps> = () => {
  return (
    <div>
      <ProjectTitle>Список доступных для анализа проектов</ProjectTitle>
      <div className="pt-8"></div>
      <ProjectList />
    </div>
  );
};

export default ProjectListPage;
