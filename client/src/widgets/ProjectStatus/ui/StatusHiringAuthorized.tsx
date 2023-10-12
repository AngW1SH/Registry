import { Button } from "@/shared/ui";
import Image from "next/image";
import { FC } from "react";

interface StatusHiringAuthorizedProps {}

const StatusHiringAuthorized: FC<StatusHiringAuthorizedProps> = () => {
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
          3
        </p>
      </div>
      <div className="pt-7" />
      <div className="h-px w-full bg-black" />
      <div className="pt-7" />
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
    </div>
  );
};

export default StatusHiringAuthorized;
