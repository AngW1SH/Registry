import { Button } from "@/shared/ui";
import Link from "next/link";
import { FC } from "react";

interface StatusHiringCompletedProps {}

const StatusHiringCompleted: FC<StatusHiringCompletedProps> = () => {
  return (
    <div className="my-auto flex flex-col overflow-hidden py-4 lg:h-full lg:w-full xl:py-0">
      <h2 className="text-center text-3xl text-primary lg:text-left xl:text-4xl">
        Проект
        <br className="hidden lg:block" /> выполнен
      </h2>
      <div className="pt-7" />
      <div className="h-px w-full bg-black" />
      <div className="pt-7" />
      <p>Ознакомиться с ходом работы и рельзутатами выполненного проекта:</p>
      <div className="pt-10 lg:hidden" />
      <Link href={`#result`} className="mt-auto flex justify-center">
        <Button className="self-center px-9">К результатам</Button>
      </Link>
    </div>
  );
};

export default StatusHiringCompleted;
