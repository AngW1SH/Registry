import { useAppDispatch, useAppSelector } from "@/app/store";
import { initializeProjectDetailed } from "@/composites/ProjectDetailed";
import { MetricSettings } from "@/entities/Metric";
import { useMetricDataUpdate } from "@/entities/Metric/hooks/useMetricDataUpdate";
import { useForceUser } from "@/entities/User";
import { AddMetric } from "@/features/AddMetric";
import { AddProvider } from "@/features/AddProvider";
import { ConfigureMetricParams } from "@/features/ConfigureMetricParams";
import ConfigureProjectTitle from "@/features/ConfigureProjectTitle/ui/ConfigureProjectTitle";
import { ConfigureResource } from "@/features/ConfigureResource";
import DeleteProject from "@/features/DeleteProject/ui/DeleteProject";
import { DeleteResource } from "@/features/DeleteResource";
import { ReturnToProject } from "@/features/ReturnToProject";
import { SearchMetric } from "@/features/SearchMetric";
import { SelectPeriod } from "@/features/SelectPeriod";
import { StopTrackingMetric } from "@/features/StopTrackingMetric";
import { ToggleMetricStatus } from "@/features/ToggleMetricStatus";
import { PlatformMetrics } from "@/widgets/PlatformMetrics";
import { ProjectTitle } from "@/widgets/ProjectTitle";
import { ResourceLinks } from "@/widgets/ResourceLinks";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ProjectSettingsPageProps {}

const ProjectSettingsPage: FC<ProjectSettingsPageProps> = () => {
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

  useMetricDataUpdate();

  if (!project) return <div></div>;

  return (
    <div className="flex gap-9">
      <div className="w-full">
        <div className="flex gap-5">
          <ProjectTitle hint={"Система управления проектами"}>
            {project.name}
          </ProjectTitle>
          <ConfigureProjectTitle project={project} />
        </div>
        <div className="pt-8"></div>
        <AddProvider className="w-full" />
        <div className="pt-8"></div>
        <ul className="flex flex-col gap-6">
          {resources.map((resource) => (
            <li key={resource.id}>
              <PlatformMetrics key={resource.id} resource={resource}>
                <DeleteResource id={resource.id} />
                <div className="pt-8" />
                <ConfigureResource resource={resource} />
                <div className="pt-8"></div>
                <AddMetric resource={resource.id} project={project.id} />
                <div className="pt-8"></div>
                <SearchMetric />
                <div className="pt-8"></div>
                <ul className="flex flex-wrap justify-between">
                  {metrics
                    .filter((metric) => metric.resource === resource.id)
                    .map((metric) => (
                      <li
                        key={metric.id + metric.data.length}
                        className="min-w-[47%] max-w-[47%]"
                      >
                        <MetricSettings
                          name={metric.name}
                          data={metric.data}
                          aside={
                            <div className="flex flex-col gap-y-3">
                              <ToggleMetricStatus metricId={metric.id} />
                              <StopTrackingMetric metricId={metric.id} />
                            </div>
                          }
                        >
                          <ConfigureMetricParams metric={metric} />
                        </MetricSettings>
                      </li>
                    ))}
                </ul>
              </PlatformMetrics>
            </li>
          ))}
        </ul>
        <div className="pt-5" />
        <DeleteProject projectId={project.id} />
        <div className="pt-10" />
      </div>
      <div className="min-w-[25%] flex flex-col">
        <ReturnToProject link={"/project/" + id} />
        <div className="mt-16" />
        <SelectPeriod />
        <div className="pt-20" />
        <ResourceLinks />
      </div>
    </div>
  );
};

export default ProjectSettingsPage;
