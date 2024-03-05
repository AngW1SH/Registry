import { IMetric } from "@/entities/Metric";
import { IProject } from "@/entities/Project";
import { IResource } from "@/entities/Resource";

export interface IResourceDetailed extends IResource {
  metrics: IMetric[];
}

export interface IProjectDetailed extends IProject {
  resources: IResourceDetailed[];
}
