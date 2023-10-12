import { ProjectDetailed } from "@/composites/ProjectDetailed";
import { IProject } from "@/entities/Project";
import { Breadcrumbs, Container } from "@/shared/ui";
import { FC } from "react";

const breadcrumbs = [
  {
    name: "Главная",
    link: "/",
  },
  {
    name: "Проекты",
    link: "/projects",
  },
];

interface ProjectHeroProps {
  project: IProject;
}

const ProjectHero: FC<ProjectHeroProps> = ({ project }) => {
  return (
    <div className="bg-secondary">
      <Container className="pt-16">
        <Breadcrumbs data={breadcrumbs} />
        <div className="pt-8" />
        <h1 className="text-center text-2xl font-semibold sm:text-4xl lg:text-left">
          {project.name}
        </h1>
        <div className="pt-7 sm:pt-14" />
        <div className="flex flex-wrap items-center justify-center text-center sm:text-left lg:w-1/2 lg:justify-start xl:flex-nowrap">
          <div className="w-full sm:w-auto lg:w-full xl:w-auto">
            <p className="pb-6 text-xl font-medium sm:pr-10 sm:text-left xl:w-min xl:pb-0 xl:pt-1">
              IT Клиника
            </p>
          </div>
          <div className="relative whitespace-nowrap pr-14 text-sm before:absolute before:bottom-0 before:left-0 before:top-0 before:hidden before:h-full before:w-px before:bg-black sm:pl-6 sm:text-base sm:before:block">
            <p>
              Срок записи
              <br />
              на проект
            </p>
            <p className="text-lg font-medium">
              {new Date(project.enrollmentEnd).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="relative whitespace-nowrap pl-6 text-sm before:absolute before:bottom-0 before:left-0 before:top-0 before:block before:h-full before:w-px before:bg-black lg:text-base">
            <p>
              Срок реализации
              <br />
              проекта
            </p>
            <p className="text-lg font-medium">
              {new Date(project.dateEnd).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="pt-48 lg:pt-28" />
      </Container>
    </div>
  );
};

export default ProjectHero;
