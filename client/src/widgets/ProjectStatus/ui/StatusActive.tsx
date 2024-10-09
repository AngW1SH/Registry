import { IProject, IProjectSingle } from "@/entities/Project";
import { IUser, formatNameShort } from "@/entities/User";
import { Button } from "@/shared/ui";
import Link from "next/link";
import { FC } from "react";

interface StatusActiveProps {
  project: IProject;
  users: IUser[] | null;
}

const StatusActive: FC<StatusActiveProps> = ({ project, users }) => {
  return (
    <div className="my-auto flex flex-col overflow-hidden lg:h-full lg:w-full lg:py-4 xl:py-0">
      <h2 className="text-center text-4xl text-primary lg:text-left">
        Назначена <br className="hidden lg:block" />
        команда
      </h2>
      <div className="pt-7" />
      <div className="h-px w-full bg-black" />
      <div className="pt-7" />
      <ul className="flex flex-wrap text-center leading-7 lg:text-left lg:text-sm xl:text-base">
        {users &&
          project.teams.length < 2 &&
          users.map((user, index) => (
            <li key={user.name + index} className="w-full sm:w-1/2">
              {formatNameShort(user.name)}
            </li>
          ))}
        {(!users || project.teams.length > 1) && (
          <p>Вы можете ознакомиться с командами-исполнителями ниже</p>
        )}
      </ul>
      <div className="py-4 lg:hidden" />
      <Link href={`#team`} className="mt-auto flex justify-center">
        <Button className="self-center px-9">Подробнее</Button>
      </Link>
    </div>
  );
};

export default StatusActive;
