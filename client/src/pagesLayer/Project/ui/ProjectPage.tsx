import { Container } from "@/shared/ui";
import { Header } from "@/widgets/Header";
import { ProjectHero } from "@/widgets/ProjectHero";
import { FC } from "react";

interface ProjectPageProps {}

const ProjectPage: FC<ProjectPageProps> = () => {
  return (
    <>
      <Container>
        <div className="pt-6" />
        <Header text="dark" />
        <div className="pt-2" />
      </Container>
      <ProjectHero />
    </>
  );
};

export default ProjectPage;
