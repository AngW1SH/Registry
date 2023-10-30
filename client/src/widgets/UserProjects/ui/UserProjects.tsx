import ProjectInspectCard from "@/composites/ProjectInspect/ui/ProjectInspectCard";
import { FC } from "react";

interface UserProjectsProps {}

const UserProjects: FC<UserProjectsProps> = () => {
  return (
    <div>
      <h2 className="text-3xl uppercase">Команды</h2>
      <div className="pt-2" />
      <ProjectInspectCard />
    </div>
  );
};

export default UserProjects;
