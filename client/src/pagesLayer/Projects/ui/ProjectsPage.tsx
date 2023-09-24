import { Header } from "@/widgets/Header";
import { Container } from "@/shared/ui";
import { FC } from "react";

interface ProjectsPageProps {}

const ProjectsPage: FC<ProjectsPageProps> = () => {
  return (
    <>
      <Container>
        <div className="pt-6" />
        <Header text="dark" />
      </Container>
    </>
  );
};

export default ProjectsPage;
