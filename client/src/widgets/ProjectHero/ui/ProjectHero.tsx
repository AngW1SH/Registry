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

interface ProjectHeroProps {}

const ProjectHero: FC<ProjectHeroProps> = () => {
  return (
    <div className="bg-secondary">
      <Container className="pt-16">
        <Breadcrumbs data={breadcrumbs} />
        <div className="pt-8" />
        <h1 className="text-4xl font-semibold">
          Изучение социально-экономических проблем соверменного испанского
          общества
        </h1>
        <div className="pt-14" />
        <div className="flex w-1/2 items-end">
          <div className="w-full">
            <p className="w-min text-xl font-medium">
              Клиника социальных проектов
            </p>
          </div>
          <div className="relative whitespace-nowrap pl-6 pr-14 before:absolute before:bottom-0 before:left-0 before:top-0 before:block before:h-full before:w-px before:bg-black">
            <p>
              Срок записи
              <br />
              на проект
            </p>
            <p className="text-lg font-medium">09.09.2023</p>
          </div>
          <div className="relative whitespace-nowrap pl-6 before:absolute before:bottom-0 before:left-0 before:top-0 before:block before:h-full before:w-px before:bg-black">
            <p>
              Срок реализации
              <br />
              проекта
            </p>
            <p className="text-lg font-medium">01.02.2023</p>
          </div>
        </div>
        <div className="pt-28" />
      </Container>
    </div>
  );
};

export default ProjectHero;
