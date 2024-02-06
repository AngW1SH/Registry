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
  data: string[];
  update_rate: Duration;
  updated_at: Timestamp;
}

export interface TaskCreateDTO {
  metric: string;
  weight: number;
  data: string[];
  update_rate: {
    seconds: string | number;
    nanos: string | number;
  };
  updated_at: {
    seconds: string | number;
    nanos: string | number;
  };
}
