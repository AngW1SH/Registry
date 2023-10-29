"use client";
import { useProfileQuery } from "@/composites/Profile";
import {
  ProjectCardWithStatus,
  getProjectsByProjectIds,
  staticProjects,
} from "@/entities/Project";
import { getTeamsByTeamIds } from "@/entities/Team";
import { NamedBlock } from "@/shared/ui";
import { FC } from "react";

interface UserProjectsPreviewProps {
  className?: string;
}

const UserProjectsPreview: FC<UserProjectsPreviewProps> = ({
  className = "",
}) => {
  const { data: profile, isLoading } = useProfileQuery();

  if (!profile) return <div></div>;

  const projectIds = getTeamsByTeamIds(profile.user.teams, profile.teams)
    .map((team) => team.project)
    .filter((project) => project !== null) as number[];

  const projects = getProjectsByProjectIds(projectIds, profile.projects);

  return (
    <NamedBlock className={className} title={"Проекты"}>
      {projects.length == 1 && <ProjectCardWithStatus project={projects[0]} />}
      <p className="pl-16 pt-1 font-[0.9375rem] text-[#898989]">Показать ещё</p>
    </NamedBlock>
  );
};

export default UserProjectsPreview;
