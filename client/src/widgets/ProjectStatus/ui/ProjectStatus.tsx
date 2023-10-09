import { Button } from "@/shared/ui";
import { FC } from "react";

interface ProjectStatusProps {
  className?: string;
}

const ProjectStatus: FC<ProjectStatusProps> = ({ className = "" }) => {
  return (
    <div
      className={
        "h-[420px] rounded-xl bg-white px-16 py-14 shadow-center-lg " +
        className
      }
    >
      <div className="flex h-full flex-col items-start">
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
        <Button className="mt-auto block self-center px-9">
          Авторизоваться
        </Button>
      </div>
    </div>
  );
};

export default ProjectStatus;
