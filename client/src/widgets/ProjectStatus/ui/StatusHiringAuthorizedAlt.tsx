import { Button } from "@/shared/ui";
import Image from "next/image";
import { FC } from "react";

interface StatusHiringAuthorizedAltProps {}

const StatusHiringAuthorizedAlt: FC<StatusHiringAuthorizedAltProps> = () => {
  return (
    <div className="h-full w-full overflow-hidden py-4 xl:py-0">
      <h2 className="text-3xl text-primary xl:text-4xl">
        Открыта запись
        <br /> на проект
      </h2>
      <div className="pt-7" />
      <div className="h-px w-full bg-black" />
      <div className="pt-7" />
      <div className="flex">
        <p className="w-1/2">Число поданных на проект заявок</p>
        <p className="flex w-1/2 items-center justify-center text-5xl font-medium">
          3
        </p>
      </div>
      <div className="pt-7" />
      <div className="h-px w-full bg-black" />
      <div className="pt-7" />
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
    </div>
  );
};

export default StatusHiringAuthorizedAlt;
