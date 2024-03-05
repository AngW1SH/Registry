export interface IAbstractMetric {
  id: string;
  name: string;
}

export interface IMetric extends IAbstractMetric {
  resource: string;
  params: string[];
  data: string[]; // Snapshots
}
