import { Header } from "@/widgets/Header";
import { Container } from "@/shared/ui";
import { FC } from "react";
import { ProjectsSearch } from "@/widgets/ProjectsSearch";

interface ProjectsPageProps {}

const ProjectsPage: FC<ProjectsPageProps> = () => {
  return (
    <>
      <Container>
        <div className="pt-6" />
        <Header text="dark" />
        <div className="pt-6" />
        <ProjectsSearch />
      </Container>
    </>
  );
};

export default ProjectsPage;
