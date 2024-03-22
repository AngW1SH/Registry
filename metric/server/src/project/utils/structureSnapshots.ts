import { Snapshot } from 'src/snapshot/snapshot.entity';

export interface StructuredSnapshotData {
  [resource: string]: {
    [metric: string]: { error: string; data: string }[];
  };
}

const extractName = (groupType: string, groups: string[]): string | null => {
  const found = groups.find((g) => g.indexOf(groupType + ':') === 0);

  if (!found) return null;

  return found.slice(groupType.length + 1);
};

export const structureSnapshots = (snapshots: Snapshot[]) => {
  const result: StructuredSnapshotData = {};

  for (const snapshot of snapshots) {
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
    });
  }

  return result;
};
