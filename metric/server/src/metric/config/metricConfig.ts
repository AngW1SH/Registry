import { MetricNames } from './metricNames';
import {
  MetricConfig,
  MetricParamType,
  MetricParamsConfig,
  UnitOfTime,
} from './types';

export const metricConfig: { [key in MetricNames]: MetricConfig } = {
  TotalCommits: {
    dependencies: [MetricNames.Commits],
    snapshotBased: false,
    params: [
      {
        type: MetricParamType.boolean,
        name: 'isGraded',
        value: true,
      },
      {
        type: MetricParamType.text,
        name: 'gradeWeight',
        value: '1',
      },
    ],
  },
  Commits: {
    dependencies: [],
    snapshotBased: true,
    isPublic: true,
    params: [
      {
        type: MetricParamType.duration,
        name: 'updateRate',
        value: {
          number: 2,
          unitOfTime: UnitOfTime.weeks,
        },
      },
      {
        type: MetricParamType.text,
        name: 'weight',
        value: '1',
      },
    ],
  },
  Issues: {
    dependencies: [],
    snapshotBased: true,
    isPublic: true,
    params: [
      {
        type: MetricParamType.duration,
        name: 'updateRate',
        value: {
          number: 2,
          unitOfTime: UnitOfTime.weeks,
        },
      },
      {
        type: MetricParamType.text,
        name: 'weight',
        value: '1',
      },
    ],
  },
  IssueCompleteness: {
    dependencies: [MetricNames.Issues],
    snapshotBased: false,
    params: [
      {
        type: MetricParamType.boolean,
        name: 'isGraded',
        value: true,
      },
      {
        type: MetricParamType.text,
        name: 'gradeWeight',
        value: '10',
      },
    ],
  },
  PullRequests: {
    dependencies: [],
    snapshotBased: true,
    isPublic: true,
    params: [
      {
        type: MetricParamType.duration,
        name: 'updateRate',
        value: {
          number: 2,
          unitOfTime: UnitOfTime.weeks,
        },
      },
      {
        type: MetricParamType.text,
        name: 'weight',
        value: '1',
      },
    ],
  },
  PullRequestHangTime: {
    dependencies: [MetricNames.PullRequests],
    snapshotBased: false,
    params: [
      {
        type: MetricParamType.boolean,
        name: 'isGraded',
        value: true,
      },
      {
        type: MetricParamType.text,
        name: 'gradeWeight',
        value: '1',
      },
    ],
  },
  RapidPullRequests: {
    dependencies: [MetricNames.PullRequests],
    snapshotBased: false,
    params: [
      {
        type: MetricParamType.boolean,
        name: 'isGraded',
        value: true,
      },
      {
        type: MetricParamType.text,
        name: 'gradeWeight',
        value: '1',
      },
    ],
  },
  Grade: {
    dependencies: [],
    snapshotBased: true,
    isPublic: true,
    params: [
      {
        type: MetricParamType.duration,
        name: 'updateRate',
        value: {
          number: 2,
          unitOfTime: UnitOfTime.weeks,
        },
      },
      {
        type: MetricParamType.text,
        name: 'weight',
        value: '1',
      },
    ],
  },
};
