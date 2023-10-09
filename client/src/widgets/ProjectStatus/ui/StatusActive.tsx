import { Button } from "@/shared/ui";
import { FC } from "react";

interface StatusActiveProps {}

const StatusActive: FC<StatusActiveProps> = () => {
  return (
    <>
      <h2 className="text-4xl text-primary">
        Назначена <br />
        команда
      </h2>
      <div className="pt-7" />
      <div className="h-px w-full bg-black" />
      <div className="pt-7" />
      <ul className="flex flex-wrap text-sm leading-7">
        <li className="w-1/2">Габдрахманов С.А.</li>
        <li className="w-1/2">Иванов С.А.</li>
        <li className="w-1/2">Сергеева А.Л.</li>
        <li className="w-1/2">Сергеева А.Л.</li>
        <li className="w-1/2">Вяземский А.К.</li>
      </ul>
      <Button className="mt-auto block self-center px-9">Подробнее</Button>
    </>
  );
};

export default StatusActive;
