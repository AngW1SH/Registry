import { useAppDispatch } from "@/app/store";
import { fetchAllProjects } from "@/entities/Project/model/projectListSlice";
import { ProjectList } from "@/widgets/ProjectList";
import { ProjectTitle } from "@/widgets/ProjectTitle";
import { FC, useEffect } from "react";

interface ProjectListPageProps {}

const ProjectListPage: FC<ProjectListPageProps> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, []);

  return (
    <div>
      <ProjectTitle>Список доступных для анализа проектов</ProjectTitle>
      <div className="pt-8"></div>
      <ProjectList />
    </div>
  );
};

export default ProjectListPage;
