import { Long } from '@grpc/proto-loader';

export interface Timestamp {
  seconds: Long;
  nanos: number;
}
