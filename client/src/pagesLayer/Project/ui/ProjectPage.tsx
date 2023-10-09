import { Container } from "@/shared/ui";
import { Header } from "@/widgets/Header";
import { ProjectHero } from "@/widgets/ProjectHero";
import { ProjectStatus } from "@/widgets/ProjectStatus";
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
      <Container className="relative">
        <ProjectStatus className="absolute bottom-0 right-0 top-0 w-[calc(50%-7rem)] -translate-y-1/2" />
      </Container>
    </>
  );
};

export default ProjectPage;
