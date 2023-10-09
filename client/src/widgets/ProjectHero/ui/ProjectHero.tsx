import { ProjectDetailed } from "@/composites/ProjectDetailed";
import { IProject } from "@/entities/Project";
import { Breadcrumbs, Container } from "@/shared/ui";
import { FC } from "react";

const breadcrumbs = [
  {
    name: "Главная",
    link: "",
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
        <h1 className="text-4xl font-semibold">{project.name}</h1>
        <div className="pt-14" />
        <div className="flex w-1/2 items-end">
          <div className="w-full">
            <p className="w-min text-xl font-medium">IT Клиника</p>
          </div>
          <div className="relative whitespace-nowrap pl-6 pr-14 before:absolute before:bottom-0 before:left-0 before:top-0 before:block before:h-full before:w-px before:bg-black">
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
          <div className="relative whitespace-nowrap pl-6 before:absolute before:bottom-0 before:left-0 before:top-0 before:block before:h-full before:w-px before:bg-black">
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
        <div className="pt-28" />
      </Container>
    </div>
  );
};

export default ProjectHero;
