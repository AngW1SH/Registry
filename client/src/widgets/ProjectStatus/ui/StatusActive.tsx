import { Button } from "@/shared/ui";
import { FC } from "react";

interface StatusActiveProps {}

const StatusActive: FC<StatusActiveProps> = () => {
  return (
    <div className="my-auto flex flex-col overflow-hidden lg:h-full lg:w-full lg:py-4 xl:py-0">
      <h2 className="text-center text-4xl text-primary lg:text-left">
        Назначена <br className="hidden lg:block" />
        команда
      </h2>
      <div className="pt-7" />
      <div className="h-px w-full bg-black" />
      <div className="pt-7" />
      <ul className="flex flex-wrap text-center leading-7 lg:text-left lg:text-sm">
        <li className="w-1/2">Габдрахманов С.А.</li>
        <li className="w-1/2">Иванов С.А.</li>
        <li className="w-1/2">Сергеева А.Л.</li>
        <li className="w-1/2">Сергеева А.Л.</li>
        <li className="w-1/2">Вяземский А.К.</li>
      </ul>
      <div className="py-4 lg:hidden" />
      <Button className="mt-auto block self-center px-9">Подробнее</Button>
    </div>
  );
};

export default StatusActive;
