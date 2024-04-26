"use client";
import { useProfileQuery } from "@/composites/Profile";
import ProjectInspectCard from "@/composites/ProjectInspect/ui/ProjectInspectCard";
import { IProject, getProjectsByProjectIds } from "@/entities/Project";
import { ITeamExtended, getTeamsByTeamIds } from "@/entities/Team";
import { useAuthQuery } from "@/entities/User";
import { FC } from "react";
import ProjectFileList from "./ProjectFileList";
import { UserProject } from "@/composites/ProjectInspect";
import ProjectLinkList from "./ProjectLinkList";

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
      <div className="flex flex-col gap-y-10 ">
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
            edit={
              profile.user.administratedTeams.includes(team.id) && (
                <>
                  <ProjectFileList project={project} />
                  <div className="pt-10" />
                  <ProjectLinkList project={project} />
                </>
              )
            }
          />
        ))}
      </div>

      {displayData.length == 0 && (
        <p className="text-[#898989]">У Вас пока нет активных проектов</p>
      )}
    </div>
  );
};

export default UserProjects;
