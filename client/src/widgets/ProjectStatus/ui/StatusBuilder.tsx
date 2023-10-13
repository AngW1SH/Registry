import { ProjectStage } from "@/entities/Project/types/types";
import { IUserWithRole } from "@/entities/User";
import { FC } from "react";
import StatusActive from "./StatusActive";
import StatusHiringUnauthorized from "./StatusHiringUnauthorized";

interface StatusBuilderProps {
  stage: ProjectStage;
  users: IUserWithRole[];
}

const StatusBuilder: FC<StatusBuilderProps> = ({ stage, users }) => {
  switch (stage) {
    case ProjectStage.active:
      return <StatusActive users={users} />;
    case ProjectStage.hiring:
      return <StatusHiringUnauthorized />;
    case ProjectStage.completed:
      return <StatusHiringUnauthorized />;
  }
};

export default StatusBuilder;
