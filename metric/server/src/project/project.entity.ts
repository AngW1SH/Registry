import {
  ResourceDetailed,
  ResourceDetailedDTO,
} from 'src/resource/resource.entity';
import { PlatformName } from '../platform/platform.entity';

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface ProjectDTO {
  id: string;
  name: string;
  description: string;
}

export interface ProjectMember {
  name: string;
  roles: string[];
  identifiers: {
    platform: PlatformName;
    value: string;
  }[];
}

export interface ProjectDetailed extends Project {
  resources: ResourceDetailed[];
}

export interface ProjectDetailedWithSnapshots extends Project {
  resources: ResourceDetailed[];
  users: ProjectMember[];
}

export interface ProjectDetailedDTO extends ProjectDTO {
  resources: ResourceDetailedDTO[];
}

export interface ProjectCreateDTO {
  name: string;
}

export interface ProjectCreate {
  name: string;
  description?: string;
}
