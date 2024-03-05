import {
  ResourceDetailed,
  ResourceDetailedDTO,
} from 'src/resource/resource.entity';

export interface Project {
  id: string;
  name: string;
}

export interface ProjectDTO {
  id: string;
  name: string;
}

export interface ProjectDetailed extends Project {
  resources: ResourceDetailed[];
}

export interface ProjectDetailedDTO extends ProjectDTO {
  resources: ResourceDetailedDTO[];
}
