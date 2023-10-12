import { TagList, staticTags } from "@/entities/Tag";
import { Container, Headline } from "@/shared/ui";
import { LinkedProjects } from "@/widgets/LinkedProjects";
import { Header } from "@/widgets/Header";
import { ProjectDescription } from "@/widgets/ProjectDescription";
import { ProjectHero } from "@/widgets/ProjectHero";
import { ProjectRequirements } from "@/widgets/ProjectRequirements";
import { ProjectStatus } from "@/widgets/ProjectStatus";
import { Supervisors } from "@/widgets/Supervisors";
import { FC } from "react";
import { Footer } from "@/widgets/Footer";
import { ProjectTeam } from "@/widgets/ProjectTeam";
import { fetchProjectDetailed } from "@/composites/ProjectDetailed/api/fetchProjectDetailed";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

const ProjectPage: FC<ProjectPageProps> = async ({ params }) => {
  const projectData = await fetchProjectDetailed(+params.slug);

  return (
    <>
      <Container>
        <div className="pt-6" />
        <Header text="dark" />
        <div className="pt-2" />
      </Container>
      <ProjectHero project={projectData.project} />
      <Container className="relative mt-[-160px] lg:mt-0">
        <ProjectStatus className="bottom-0 right-0 top-0 lg:absolute lg:w-[calc(50%-3rem)] lg:-translate-y-[calc(50%-0.75rem)] xl:w-[calc(50%-7rem)]" />
        <div className="pt-5" />
        <Supervisors
          project={projectData.project}
          className="lg:w-[calc(50%+1rem)] xl:w-[calc(50%+3rem)]"
        />
      </Container>
      <div className="pt-10" />
      <Container>
        <TagList tags={projectData.tags} />
        <div className="pt-20" />
        <ProjectDescription project={projectData.project} />
        <div className="pt-24" />
        <ProjectTeam team={projectData.team} users={projectData.users} />
        <div className="pt-24" />
        <ProjectRequirements project={projectData.project} />
        <div className="pt-16" />
      </Container>
      <Headline>
        <Container>
          <h2 className="text-2xl font-bold uppercase">Связанные проекты</h2>
        </Container>
      </Headline>
      <div className="pt-8" />
      <Container>
        <LinkedProjects />
      </Container>
      <div className="pt-32" />
      <Footer />
    </>
  );
};

export default ProjectPage;
