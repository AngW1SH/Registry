import { IProject, ProjectStage, getProjectStage } from "@/entities/Project";
import { IUserWithRole } from "@/entities/User";
import { FC } from "react";
import StatusActive from "./StatusActive";
import StatusHiring from "./StatusHiring";
import StatusHiringCompleted from "./StatusCompleted";

interface StatusBuilderProps {
  project: IProject;
  users: IUserWithRole[] | null;
}

const StatusBuilder: FC<StatusBuilderProps> = ({ project, users }) => {
  const stage = getProjectStage(project);

  switch (stage) {
    case ProjectStage.active:
      return <StatusActive users={users} />;
    case ProjectStage.hiring:
      return <StatusHiring project={project} />;
    case ProjectStage.completed:
      return <StatusHiringCompleted />;
  }
};

export default StatusBuilder;
