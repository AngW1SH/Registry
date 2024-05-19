import { useAppDispatch, useAppSelector } from "@/app/store";
import { initializeProjectDetailed } from "@/composites/ProjectDetailed";
import { useMetricDataUpdate } from "@/entities/Metric/hooks/useMetricDataUpdate";
import { useForceUser } from "@/entities/User";
import DeleteProject from "@/features/DeleteProject/ui/DeleteProject";
import { LoadingCircle } from "@/shared/ui/LoadingCircle";
import { ProjectTitle } from "@/widgets/ProjectTitle";
import { FC, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditProject from "@/features/EditProject/ui/EditProject";
import { ArrowDown } from "@/shared/ui/Icons";
import { CreateResource } from "@/features/Resource";
import { ResourceConfigure } from "@/widgets/ResourceConfigure";

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

  const isLoading = useAppSelector((state) => state.project.isLoading);

  useEffect(() => {
    if (id) {
      if (!project || project.id != id) initializeProjectDetailed(dispatch, id);
    } else {
      navigate(import.meta.env.VITE_BASE_PATH);
    }
  }, []);

  useForceUser();

  useMetricDataUpdate();

  return (
    <div className="pr-20">
      {isLoading && (
        <div className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
          <LoadingCircle size={80} />
        </div>
      )}
      {!isLoading && project && (
        <>
          <Link
            to={import.meta.env.VITE_BASE_PATH + "project/" + project.id}
            className="flex items-center gap-3"
          >
            <div className="h-9 w-9 p-3 pt-[15px] rotate-90 rounded-full bg-background">
              <ArrowDown />
            </div>
            <p className="text-[#828487] text-sm">Back to Project</p>
          </Link>
          <div className="pt-6" />
          <div className="flex items-start gap-5">
            <div className="max-w-[60%]">
              <ProjectTitle hint={project.description}>
                {project.name}
              </ProjectTitle>
            </div>
            <EditProject project={project} />
            <DeleteProject className="ml-auto" projectId={project.id} />
          </div>
          <div className="pt-14"></div>
          <div className="flex items-center gap-14">
            <h1 className="text-6xl font-medium">Resources</h1>
            <CreateResource />
          </div>
          <div className="pt-8"></div>
          <ul className="flex flex-col gap-6">
            {resources.map((resource) => (
              <li key={resource.id}>
                <ResourceConfigure
                  resource={resource}
                  key={resource.id}
                  project={project}
                  metrics={metrics}
                />
              </li>
            ))}
          </ul>
          <div className="pt-5" />
        </>
      )}
    </div>
  );
};

export default ProjectSettingsPage;
