import { Button } from "@/shared/ui";
import { FC } from "react";

interface StatusHiringUnauthorizedProps {}

const StatusHiringUnauthorized: FC<StatusHiringUnauthorizedProps> = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden py-4 xl:py-0">
      <h2 className="text-3xl text-primary xl:text-4xl">
        Открыта запись
        <br /> на проект
      </h2>
      <div className="pt-7" />
      <div className="h-px w-full bg-black" />
      <div className="pt-7" />
      <p>
        Для подачи заявки и просмотра информации о заявках на проект необходимо
        авторизоваться
      </p>
      <Button className="mt-auto block self-center px-9">Авторизоваться</Button>
    </div>
  );
};

export default StatusHiringUnauthorized;
