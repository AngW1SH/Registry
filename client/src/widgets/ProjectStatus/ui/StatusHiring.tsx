"use client";
import { useAuthUserQuery } from "@/composites/AuthUser";
import { FC } from "react";
import { useProjectStatusDataQuery } from "../model/useProjectStatusDataQuery";
import { IProject } from "@/entities/Project";
import StatusHiringUnauthorized from "./StatusHiringUnauthorized";
import StatusHiringTeamlead from "./StatusHiringTeamlead";
import Image from "next/image";
import { getTeamsByTeamIds } from "@/entities/Team";

interface StatusHiringProps {
  project: IProject;
}

const StatusHiring: FC<StatusHiringProps> = ({ project }) => {
  const { data: authUser, isLoading: isAuthUserLoading } = useAuthUserQuery();
  const { data: projectStatusData, isLoading: isStatusDataLoading } =
    useProjectStatusDataQuery(project.id);

  if (isAuthUserLoading || isStatusDataLoading || !projectStatusData)
    return <div></div>;

  if (!authUser) return <StatusHiringUnauthorized />;

  if (projectStatusData.assignableTeams.length)
    return (
      <StatusHiringTeamlead
        project={project}
        options={getTeamsByTeamIds(
          projectStatusData.assignableTeams,
          authUser.teams,
        ).map((team) => team.name)}
      />
    );

  return (
    <div className="my-auto overflow-hidden lg:h-full lg:w-full lg:py-4 xl:py-0">
      <h2 className="text-center text-3xl text-primary lg:text-left xl:text-4xl">
        Открыта запись
        <br className="hidden lg:block" /> на проект
      </h2>
      <div className="pt-7" />
      <div className="h-px w-full bg-black" />
      <div className="pt-7" />
      <div className="flex">
        <p className="w-1/2">Число поданных на проект заявок</p>
        <p className="flex w-1/2 items-center justify-center text-5xl font-medium">
          {project.requestCount}
        </p>
      </div>
      <div className="pt-7" />
      <div className="h-px w-full bg-black" />
      <div className="pt-7" />
      {projectStatusData.hasApplied && (
        <div className="flex items-center gap-6">
          <div className="h-10 w-10 min-w-[2.5rem] rounded-full border-2 border-primary p-[0.6rem]">
            <div className="relative h-full w-full">
              <Image src="/checked-icon-red.svg" fill={true} alt="" />
            </div>
          </div>
          <div>
            <p>Вы состоите в команде, подавшей заявку на проект</p>
          </div>
        </div>
      )}
      {!projectStatusData.hasApplied && (
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 min-w-[2.5rem] items-center justify-center rounded-full border-2 border-primary text-2xl font-bold text-primary">
            !
          </div>
          <div>
            <p className="text-sm">
              Вы не состоите ни в одной команде из подавших заявку на проект
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusHiring;
