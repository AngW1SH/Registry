import { useAppDispatch } from "@/app/store";
import { fetchAllProjects } from "@/composites/ProjectInList/models/projectListSlice";
import { useForceUser } from "@/entities/User";
import { AddProject } from "@/features/AddProject";
import { ProjectList } from "@/widgets/ProjectList";
import { FC, useEffect } from "react";

interface ProjectListPageProps {}

const ProjectListPage: FC<ProjectListPageProps> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, []);

  useForceUser();

  return (
    <div className="relative pr-20">
      <div className="pt-20" />
      <div className="flex items-center gap-14">
        <h1 className="text-6xl font-medium">Projects</h1>
        <AddProject className="top-0 right-0" />
      </div>
      <div className="pt-10"></div>
      <ProjectList />
    </div>
  );
};

export default ProjectListPage;
