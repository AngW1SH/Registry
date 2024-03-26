import { useAppDispatch, useAppSelector } from "@/app/store";
import { initializeProjectDetailed } from "@/composites/ProjectDetailed";
import { ConfigureProject } from "@/features/ConfigureProject";
import { SelectPeriod } from "@/features/SelectPeriod";
import { PerformanceModule } from "@/widgets/PerformanceModule";
import { PlatformMetrics } from "@/widgets/PlatformMetrics";
import { ProjectTitle } from "@/widgets/ProjectTitle";
import { ResourceLinks } from "@/widgets/ResourceLinks";
import { MetricList } from "@/widgets/MetricList";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForceUser } from "@/entities/User";

interface ProjectPageProps {}

const ProjectPage: FC<ProjectPageProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { project, resources, metrics } = useAppSelector((state) => ({
    project: state.project.project,
    resources: state.resource.resources,
    metrics: state.metric.metrics,
  }));

  useEffect(() => {
    if (id) {
      initializeProjectDetailed(dispatch, id);
    } else {
      navigate("/");
    }
  }, []);

  useForceUser();

  if (!project) return <div></div>;

  return (
    <div className="flex gap-9">
      <div className="w-full">
        <ProjectTitle hint={"Система управления проектами"}>
          {project.name}
        </ProjectTitle>
        <div className="pt-8"></div>
        <ul className="flex flex-col gap-6">
          {resources.map((resource) => (
            <li key={resource.id}>
              <PlatformMetrics resource={resource} key={resource.id}>
                <PerformanceModule />
                <div className="pt-8" />
                <MetricList
                  metrics={metrics.filter(
                    (metric) => metric.resource == resource.id
                  )}
                />
              </PlatformMetrics>
            </li>
          ))}
        </ul>
      </div>
      <div className="min-w-[25%] flex flex-col">
        <ConfigureProject link={"/project/" + id + "/settings"} />
        <div className="mt-16" />
        <SelectPeriod />
        <div className="pt-20" />
        <ResourceLinks />
      </div>
    </div>
  );
};

export default ProjectPage;
