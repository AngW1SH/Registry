import { Button } from "@/shared/ui";
import { FC } from "react";

interface StatusHiringUnauthorizedProps {}

const StatusHiringUnauthorized: FC<StatusHiringUnauthorizedProps> = () => {
  return (
    <>
      <h2 className="text-4xl text-primary">
        Открыта запись
        <br /> на проект
      </h2>
      <div className="pt-7" />
      <div className="h-px w-full bg-black" />
      <div className="pt-7" />
      <p>
        Для подачи заявки или просмотра информации о заявках на проект
        необходимо авторизоваться
      </p>
      <Button className="mt-auto block self-center px-9">Авторизоваться</Button>
    </>
  );
};

export default StatusHiringUnauthorized;
