import { Header } from "@/widgets/Header";
import { Container } from "@/shared/ui";
import { FC } from "react";
import { ProjectsSearch } from "@/widgets/ProjectsSearch";
import { Subscribe } from "@/widgets/Subscribe";
import { Footer } from "@/widgets/Footer";
import { Metadata } from "next";

export const ProjectsPageMetadata: Metadata = {
  title: "Проекты - Реестр проектов клинической практики СПбГУ",
  description:
    "Платформа для размещения образовательных проектов для выполнения студентами СПбГУ. Наш сервис предоставляет возможность совместной работы над учебными заданиями, расширения знаний и навыков, а также создания перспектив для будущей карьеры.",
};

interface ProjectsPageProps {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProjectsPage: FC<ProjectsPageProps> = ({ searchParams }) => {
  return (
    <>
      <Container>
        <div className="pt-6" />
        <Header text="dark" />
        <div className="pt-6" />
        <ProjectsSearch searchParams={searchParams} />
        <div className="pt-10" />
        <Subscribe />
      </Container>
      <div className="pt-8" />
      <Footer />
    </>
  );
};

export default ProjectsPage;
