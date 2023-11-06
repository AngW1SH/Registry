import { IProject, ProjectStage, getProjectStage } from "@/entities/Project";
import { FC } from "react";
import StatusActive from "./StatusActive";
import StatusHiring from "./StatusHiring";
import StatusHiringCompleted from "./StatusCompleted";
import { IUser } from "@/entities/User";

interface StatusBuilderProps {
  project: IProject;
  users: IUser[] | null;
}

const StatusBuilder: FC<StatusBuilderProps> = ({ project, users }) => {
  const stage = getProjectStage(project);

  switch (stage) {
    case ProjectStage.active:
      return <StatusActive project={project} users={users} />;
    case ProjectStage.hiring:
      return <StatusHiring project={project} />;
    case ProjectStage.completed:
      return <StatusHiringCompleted />;
  }
};

export default StatusBuilder;
