import { ConfigureProject } from "@/features/ConfigureProject";
import { PerformanceModule } from "@/widgets/PerformanceModule";
import { PlatformMetrics } from "@/widgets/PlatformMetrics";
import { ProjectTitle } from "@/widgets/ProjectTitle";
import { FC } from "react";

interface ProjectPageProps {}

const ProjectPage: FC<ProjectPageProps> = () => {
  return (
    <div className="flex gap-9">
      <div className="w-full">
        <ProjectTitle hint={"Система управления проектами"}>
          Реестр проектов клинической практики СПбГУ
        </ProjectTitle>
        <div className="pt-8"></div>
        <PlatformMetrics>
          <PerformanceModule />
        </PlatformMetrics>
      </div>
      <div className="min-w-[25%] flex flex-col">
        <ConfigureProject />
      </div>
    </div>
  );
};

export default ProjectPage;
