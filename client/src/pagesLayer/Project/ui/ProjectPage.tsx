import { Container } from "@/shared/ui";
import { Header } from "@/widgets/Header";
import { ProjectDescription } from "@/widgets/ProjectDescription";
import { ProjectHero } from "@/widgets/ProjectHero";
import { ProjectStatus } from "@/widgets/ProjectStatus";
import { Supervisors } from "@/widgets/Supervisors";
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
        <ProjectStatus className="absolute bottom-0 right-0 top-0 w-[calc(50%-7rem)] -translate-y-[calc(50%-0.75rem)]" />
        <div className="pt-5" />
        <Supervisors className="w-[calc(50%+3rem)]" />
      </Container>
      <div className="pt-20" />
      <Container>
        <ProjectDescription />
      </Container>
    </>
  );
};

export default ProjectPage;
