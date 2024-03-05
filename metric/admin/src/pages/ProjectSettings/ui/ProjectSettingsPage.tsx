import { useAppDispatch, useAppSelector } from "@/app/store";
import { initializeProjectDetailed } from "@/composites/ProjectDetailed";
import { AddMetric } from "@/features/AddMetric";
import { AddProvider } from "@/features/AddProvider";
import { ReturnToProject } from "@/features/ReturnToProject";
import { SearchMetric } from "@/features/SearchMetric";
import { SelectPeriod } from "@/features/SelectPeriod";
import { SetAPIEndpoint } from "@/features/SetAPIEndpoint";
import { SetAPIKeys } from "@/features/SetAPIKeys";
import MetricSettings from "@/widgets/MetricSettings/ui/MetricSettings";
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
          Реестр проектов клинической практики СПбГУ
        </ProjectTitle>
        <div className="pt-8"></div>
        <AddProvider className="w-full" />
        <div className="pt-8"></div>
        {resources.map((resource) => (
          <PlatformMetrics resource={resource}>
            <SetAPIEndpoint />
            <div className="pt-8"></div>
            <SetAPIKeys />
            <div className="pt-8"></div>
            <AddMetric />
            <div className="pt-8"></div>
            <SearchMetric />
            <div className="pt-8"></div>
            <ul className="flex flex-wrap justify-between">
              <li className="min-w-[47%] max-w-[47%]">
                <MetricSettings />
              </li>
              <li className="min-w-[47%] max-w-[47%]">
                <MetricSettings />
              </li>
            </ul>
          </PlatformMetrics>
        ))}
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
