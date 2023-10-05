import { Header } from "@/widgets/Header";
import { Container } from "@/shared/ui";
import { FC } from "react";
import { ProjectsSearch } from "@/widgets/ProjectsSearch";
import { Subscribe } from "@/widgets/Subscribe";
import { Footer } from "@/widgets/Footer";

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
