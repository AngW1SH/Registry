"use client";
import { useProfileQuery } from "@/composites/Profile";
import ProjectInspectCard from "@/composites/ProjectInspect/ui/ProjectInspectCard";
import { IProject, getProjectsByProjectIds } from "@/entities/Project";
import { ITeamExtended, getTeamsByTeamIds } from "@/entities/Team";
import { useAuthQuery } from "@/entities/User";
import { EditProject } from "@/features/EditProject";
import { FC } from "react";
import ProjectFileList from "./ProjectFileList";
import { UserProject } from "@/composites/ProjectInspect";

interface UserProjectsProps {}

const UserProjects: FC<UserProjectsProps> = () => {
  const { data: user } = useAuthQuery();
  const { data: profile } = useProfileQuery();

  if (!user || !profile) return <div></div>;

  const userProjects = getProjectsByProjectIds(
    profile.user.projects,
    profile.projects,
  ) as UserProject[];

  const displayData: { project: UserProject; team: ITeamExtended }[] = [];

  userProjects.forEach((project) => {
    // If we managed to find a corresponding team in profile.teams,
    // the user is definitely a member or an administrator,
    // because profile.teams only contains the user's teams
    const projectTeams = getTeamsByTeamIds(project.teams, profile.teams).filter(
      (team) => team,
    );

    projectTeams.forEach((team) => displayData.push({ project, team }));
  });

  return (
    <div>
      <h2 className="text-3xl uppercase">Проекты</h2>
      <div className="pt-2" />
      {displayData.map(({ project, team }) => (
        <ProjectInspectCard
          key={project.id + "-" + team.id}
          user={user}
          projectInspect={{
            project: project,
            team: team,
            members: profile.members,
            users: profile.users,
          }}
          edit={<ProjectFileList project={project} />}
        />
      ))}
      {displayData.length == 0 && (
        <p className="text-[#898989]">У Вас пока нет активных проектов</p>
      )}
    </div>
  );
};

export default UserProjects;
