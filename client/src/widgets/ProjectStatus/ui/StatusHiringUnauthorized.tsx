import { Button } from "@/shared/ui";
import Link from "next/link";
import { FC } from "react";

interface StatusHiringUnauthorizedProps {}

const StatusHiringUnauthorized: FC<StatusHiringUnauthorizedProps> = () => {
  return (
    <div className="my-auto flex flex-col overflow-hidden py-4 lg:h-full lg:w-full xl:py-0">
      <h2 className="text-center text-3xl text-primary lg:text-left xl:text-4xl">
        Открыта запись
        <br className="hidden lg:block" /> на проект
      </h2>
      <div className="pt-7" />
      <div className="h-px w-full bg-black" />
      <div className="pt-7" />
      <p>
        Для подачи заявки и просмотра информации о заявках на проект необходимо
        авторизоваться
      </p>
      <div className="pt-10 lg:hidden" />
      <Button className="mt-auto block self-center px-9">
        <Link href="/api/user/try">Авторизоваться</Link>
      </Button>
    </div>
  );
};

export default StatusHiringUnauthorized;
