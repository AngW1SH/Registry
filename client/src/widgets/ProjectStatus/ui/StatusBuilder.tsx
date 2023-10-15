"use client";
import { IProject, ProjectStage } from "@/entities/Project";
import { IUserWithRole } from "@/entities/User";
import { FC } from "react";
import StatusActive from "./StatusActive";
import StatusHiringUnauthorized from "./StatusHiringUnauthorized";
import { useAuthUserQuery } from "@/composites/AuthUser";
import { useProjectStatusDataQuery } from "../model/useProjectStatusDataQuery";

interface StatusBuilderProps {
  project: IProject;
  stage: ProjectStage;
  users: IUserWithRole[];
}

const StatusBuilder: FC<StatusBuilderProps> = ({ project, stage, users }) => {
  const { data: authUser } = useAuthUserQuery();
  const { data: projectStatusData } = useProjectStatusDataQuery(project.id);

  console.log(projectStatusData);

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
