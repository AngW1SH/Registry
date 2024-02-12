import { ConfigureProject } from "@/features/ConfigureProject";
import { SelectPeriod } from "@/features/SelectPeriod";
import { PerformanceModule } from "@/widgets/PerformanceModule";
import { PlatformMetrics } from "@/widgets/PlatformMetrics";
import { ProjectTitle } from "@/widgets/ProjectTitle";
import { ResourceLinks } from "@/widgets/ResourceLinks";
import { Task } from "@/widgets/Temp/Task";
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
          <div className="pt-8" />
          <div className="flex gap-8">
            <Task name="Task 1" metric="1" className="flex-1" />
            <Task name="Task 2" metric="2" className="flex-1" />
            <Task name="Task 3" metric="3" className="flex-1" />
          </div>
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
