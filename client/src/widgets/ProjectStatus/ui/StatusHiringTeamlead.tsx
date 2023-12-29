"use client";
import { IProject } from "@/entities/Project";
import { getProjectHiringSlotCount } from "@/entities/Project/utils/getProjectHiringSlotCount";
import { ITeam } from "@/entities/Team";
import { SendRequest } from "@/features/SendRequest";
import { Button, Dropdown, FileUpload } from "@/shared/ui";
import Image from "next/image";
import { FC, useRef, useState } from "react";

interface StatusHiringTeamleadProps {
  project: IProject;
  assignableTeams: ITeam[];
}

const StatusHiringTeamlead: FC<StatusHiringTeamleadProps> = ({
  project,
  assignableTeams,
}) => {
  const [isApplying, setIsApplying] = useState(false);

  const [hasApplied, setHasApplied] = useState(false);

  /*
      <div className="flex">
        <p className="w-1/2">Число поданных на проект заявок</p>
        <p className="flex w-1/2 items-center justify-center text-5xl font-medium">
          {project.requestCount}
        </p>
      </div>
  */

  return (
    <div className="my-auto w-full overflow-hidden py-4 lg:h-full lg:w-full xl:py-0">
      <div
        className="flex h-full transition-transform"
        style={{
          transform: isApplying ? "translate(-100%, 0)" : "",
        }}
      >
        <div className="flex h-full min-w-full flex-col">
          <div className="pt-5 lg:pt-0" />
          <h2 className="text-center text-3xl text-primary lg:text-left xl:text-4xl">
            Открыта запись
            <br className="hidden lg:block" /> на проект
          </h2>
          <div className="pt-7" />
          <div className="h-px w-full bg-black" />
          <div className="pt-7" />
          <div className="flex">
            <p className="w-1/2">Число вакансий для команд</p>
            <p className="flex w-1/2 items-center justify-center text-5xl font-medium">
              {getProjectHiringSlotCount(project)}
            </p>
          </div>
          <div className="pt-14 lg:pt-7" />
          <Button
            className="mt-auto block self-center px-9"
            onClick={() => setIsApplying(true)}
          >
            Подать заявку
          </Button>
        </div>
        <div className="flex min-w-full flex-col lg:h-full">
          <button
            className="relative h-6 w-6"
            onClick={() => setIsApplying(false)}
          >
            <Image
              src="/link-arrow-black-alt.svg"
              className="rotate-180"
              fill={true}
              alt="Вернуться к числу заявок"
            />
          </button>
          <div className="pt-5" />
          <SendRequest project={project} assignableTeams={assignableTeams} />
        </div>
      </div>
    </div>
  );
};

export default StatusHiringTeamlead;
