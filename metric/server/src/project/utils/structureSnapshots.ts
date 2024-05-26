import { MetricSnapshot } from 'src/metric/metric.entity';
import { Snapshot } from 'src/snapshot/snapshot.entity';

export interface StructuredSnapshotData {
  [resource: string]: {
    [metric: string]: MetricSnapshot[];
  };
}

export const structureSnapshots = (snapshots: Snapshot[]) => {
  const result: StructuredSnapshotData = {};

  for (const snapshot of snapshots) {
    // Get the resource name
    const resource = snapshot.groups
      .find((g) => g.indexOf('resource:') === 0)
      ?.slice(9);

    if (!resource || !snapshot.metric) continue;

    if (!result[resource]) result[resource] = {};
    if (!result[resource][snapshot.metric])
      result[resource][snapshot.metric] = [];

    result[resource][snapshot.metric].push({
      error: snapshot.error,
      data: snapshot.data,
      timestamp: snapshot.timestamp,
    });
  }

  return result;
};
