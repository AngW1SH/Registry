import { useAppDispatch, useAppSelector } from "@/app/store";
import { initializeProjectDetailed } from "@/composites/ProjectDetailed";
import { ConfigureProject } from "@/features/ConfigureProject";
import { SelectPeriod } from "@/features/SelectPeriod";
import { PerformanceModule } from "@/widgets/PerformanceModule";
import { PlatformMetrics } from "@/widgets/PlatformMetrics";
import { ProjectTitle } from "@/widgets/ProjectTitle";
import { ResourceLinks } from "@/widgets/ResourceLinks";
import { Task } from "@/widgets/Temp/Task";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ProjectPageProps {}

const ProjectPage: FC<ProjectPageProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { project, resources } = useAppSelector((state) => ({
    project: state.project.project,
    resources: state.resource.resources,
  }));

  useEffect(() => {
    if (id) {
      initializeProjectDetailed(dispatch, id);
    } else {
      navigate("/");
    }
  }, []);

  if (!project) return <div></div>;

  return (
    <div className="flex gap-9">
      <div className="w-full">
        <ProjectTitle hint={"Система управления проектами"}>
          {project.name}
        </ProjectTitle>
        <div className="pt-8"></div>
        {resources.map((resource) => (
          <PlatformMetrics resource={resource} key={resource.id}>
            <PerformanceModule />
            <div className="pt-8" />
            <div className="flex gap-8">
              <Task name="Task 1" metric="1" className="flex-1" />
              <Task name="Task 2" metric="2" className="flex-1" />
              <Task name="Task 3" metric="3" className="flex-1" />
            </div>
          </PlatformMetrics>
        ))}
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
