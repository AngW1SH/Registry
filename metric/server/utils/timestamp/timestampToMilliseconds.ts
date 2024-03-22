import { Timestamp } from './types';

export const timestampToMilliseconds = (timestamp: Timestamp) => {
  return timestamp.seconds.toNumber() * 1000 + timestamp.nanos / 1000000;
};
