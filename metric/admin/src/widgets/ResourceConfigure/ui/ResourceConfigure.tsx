import { useAppSelector } from "@/app/store";
import { IMetric, MetricSettings } from "@/entities/Metric";
import { useGetMetricInfoQuery } from "@/entities/Metric/model/metricApi";
import { PlatformIcon } from "@/entities/Platform";
import { IProject } from "@/entities/Project";
import { IResource, ResourceCard } from "@/entities/Resource";
import {
  CreateMetric,
  DeleteMetric,
  ForceExecuteMetric,
  SearchMetrics,
  ToggleMetricsStatus,
  MetricParams,
} from "@/features/Metric";
import {
  CreateAllMetrics,
  DeleteResource,
  ResourceSettings,
  ToggleResourceMetrics,
} from "@/features/Resource";
import { FC } from "react";
import { shallowEqual } from "react-redux";

interface ResourceConfigureProps {
  resource: IResource;
  project: IProject;
  metrics: IMetric[];
}

const ResourceConfigure: FC<ResourceConfigureProps> = ({
  resource,
  project,
  metrics,
}) => {
  const { data: metricData } = useGetMetricInfoQuery();

  const metricFilters = useAppSelector(
    (state) => state.metric.filters,
    shallowEqual
  );
  const platform = useAppSelector(
    (state) =>
      state.platform.platforms.find(
        (platform) => platform.name === resource.platform
      ),
    shallowEqual
  );

  if (!platform) return <></>;

  return (
    <ResourceCard
      key={resource.id}
      resource={resource}
      icon={<PlatformIcon name={platform.name} />}
      actions={
        <div className="flex gap-4 justify-between">
          <ToggleResourceMetrics resourceId={resource.id} />
          <DeleteResource id={resource.id} />
        </div>
      }
    >
      <div className="pt-8" />
      <ResourceSettings resource={resource} />
      <div className="pt-8"></div>
      <div className=" bg-background rounded-lg py-14 px-7">
        <h2 className="font-semibold text-4xl">Resource Metrics</h2>
        <div className="pt-8" />
        <CreateAllMetrics resource={resource.id} />
        <div className="pt-8" />
        <CreateMetric resource={resource.id} project={project.id} />
        <div className="pt-8"></div>
        <SearchMetrics />
        <div className="pt-8"></div>
        <ul className="flex flex-wrap gap-x-[30px] gap-y-10 after:flex-auto">
          {metrics
            .filter(
              (metric) =>
                metric.resource === resource.id &&
                metric.name.includes(metricFilters.search)
            )
            .map((metric) => (
              <li
                key={metric.id + metric.data.length}
                className="min-w-[calc(33%-20px)] max-w-[calc(33%-20px)] border border-[#dcdcdc] rounded-xl"
              >
                <MetricSettings
                  name={metric.name}
                  data={metric.data}
                  aside={
                    <div className="flex justify-end items-center gap-3">
                      {metricData?.find(
                        (m) => m.name === metric.name && m.snapshotBased
                      ) && <ForceExecuteMetric metricId={metric.id} />}
                      {metricData?.find(
                        (m) => m.name === metric.name && m.snapshotBased
                      ) && <ToggleMetricsStatus metricId={metric.id} />}
                      <DeleteMetric metricId={metric.id} />
                    </div>
                  }
                >
                  <MetricParams metric={metric} />
                </MetricSettings>
              </li>
            ))}
        </ul>
      </div>
    </ResourceCard>
  );
};

export default ResourceConfigure;
