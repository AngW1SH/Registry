import { useAppSelector } from "@/app/store";
import { IMetric, MetricSettings } from "@/entities/Metric";
import { useGetMetricInfoQuery } from "@/entities/Metric/model/metricApi";
import { PlatformIcon } from "@/entities/Platform";
import { IProject } from "@/entities/Project";
import { IResource, ResourceCard } from "@/entities/Resource";
import { AddMetric } from "@/features/AddMetric";
import { ConfigureMetricParams } from "@/features/ConfigureMetricParams";
import { ExecuteMetric } from "@/features/ExecuteMetric";
import {
  CreateAllMetrics,
  DeleteResource,
  ResourceSettings,
  ToggleResourceMetrics,
} from "@/features/Resource";
import { SearchMetric } from "@/features/SearchMetric";
import { StopTrackingMetric } from "@/features/StopTrackingMetric";
import { ToggleMetricStatus } from "@/features/ToggleMetricStatus";
import { FC } from "react";

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

  const metricFilters = useAppSelector((state) => state.metric.filters);
  const platform = useAppSelector((state) =>
    state.platform.platforms.find(
      (platform) => platform.id === resource.platform
    )
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
        <AddMetric resource={resource.id} project={project.id} />
        <div className="pt-8"></div>
        <SearchMetric />
        <div className="pt-8"></div>
        <ul className="flex flex-wrap gap-10 justify-between">
          {metrics
            .filter(
              (metric) =>
                metric.resource === resource.id &&
                metric.name.includes(metricFilters.search)
            )
            .map((metric) => (
              <li
                key={metric.id + metric.data.length}
                className="min-w-[calc(50%-20px)] max-w-[calc(50%-20px)] border border-[#dcdcdc] rounded-xl"
              >
                <MetricSettings
                  name={metric.name}
                  data={metric.data}
                  aside={
                    <div className="flex justify-end items-center gap-3">
                      {metricData?.find(
                        (m) => m.name === metric.name && m.snapshotBased
                      ) && <ExecuteMetric metricId={metric.id} />}
                      {metricData?.find(
                        (m) => m.name === metric.name && m.snapshotBased
                      ) && <ToggleMetricStatus metricId={metric.id} />}
                      <StopTrackingMetric metricId={metric.id} />
                    </div>
                  }
                >
                  <ConfigureMetricParams metric={metric} />
                </MetricSettings>
              </li>
            ))}
        </ul>
      </div>
    </ResourceCard>
  );
};

export default ResourceConfigure;
