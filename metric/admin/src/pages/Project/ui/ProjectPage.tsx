import { ConfigureProject } from "@/features/ConfigureProject";
import { SelectPeriod } from "@/features/SelectPeriod";
import { PerformanceModule } from "@/widgets/PerformanceModule";
import { PlatformMetrics } from "@/widgets/PlatformMetrics";
import { ProjectTitle } from "@/widgets/ProjectTitle";
import { ResourceLinks } from "@/widgets/ResourceLinks";
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
        <div className="mt-16" />
        <SelectPeriod />
        <div className="pt-20" />
        <ResourceLinks />
      </div>
    </div>
  );
};

export default ProjectPage;
