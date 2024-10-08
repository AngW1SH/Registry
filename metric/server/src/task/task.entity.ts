import { Duration } from '@grpc/grpc-js/build/src/duration';
import { Timestamp } from '@grpc/grpc-js/build/src/generated/google/protobuf/Timestamp';

export interface Task extends TaskCreate {
  id: string;
}

export interface TaskDTO extends TaskCreateDTO {
  id: string;
}

export interface TaskCreate {
  metric: string;
  weight: number;
  data: string;
  update_rate: Duration;
  groups: string[];
  is_public: boolean;
  created_at: Timestamp | null;
  deleted_at: Timestamp | null;
}

export interface TaskStop {
  metric: string;
  groups: string[];
  delete_snapshots: boolean;
}

export interface TaskForceExecute {
  task: TaskCreate;
  groups: string[];
}

export interface UpdateGroupNameData {
  old: string;
  new: string;
}

export interface TaskCreateDTO {
  metric: string;
  weight: number;
  data: string;
  update_rate: {
    seconds: string | number;
    nanos: string | number;
  };
  groups: string[];
  is_public: boolean;
}

export interface UpdateByGroupName {
  group: string;
  created_at: Timestamp | null;
  deleted_at: Timestamp | null;
}
