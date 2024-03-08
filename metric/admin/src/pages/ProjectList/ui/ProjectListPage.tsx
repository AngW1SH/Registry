import { useAppDispatch } from "@/app/store";
import { fetchAllProjects } from "@/entities/Project/model/projectListSlice";
import { AddProject } from "@/features/AddProject";
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
    <div className="relative">
      <ProjectTitle>Список доступных для анализа проектов</ProjectTitle>
      <div className="pt-8"></div>
      <ProjectList />
      <AddProject className="top-0 right-0 absolute px-14" />
    </div>
  );
};

export default ProjectListPage;
