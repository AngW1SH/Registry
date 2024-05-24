import { MetricName } from './metricNames';
import {
  MetricConfig,
  MetricParamType,
  MetricParamsConfig,
  UnitOfTime,
} from '../types';

export const metricConfig: { [key in MetricName]: MetricConfig } = {
  [MetricName.TotalCommits]: {
    dependencies: [MetricName.Commits],
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
  [MetricName.Commits]: {
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
  [MetricName.Issues]: {
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
  [MetricName.IssueCompleteness]: {
    dependencies: [MetricName.Issues],
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
  [MetricName.PullRequests]: {
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
  [MetricName.PullRequestHangTime]: {
    dependencies: [MetricName.PullRequests],
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
  [MetricName.RapidPullRequests]: {
    dependencies: [MetricName.PullRequests],
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
  [MetricName.DominantWeekDay]: {
    dependencies: [
      MetricName.Commits,
      MetricName.Issues,
      MetricName.PullRequests,
    ],
    snapshotBased: false,
    params: [],
  },
  [MetricName.CodeChurn]: {
    dependencies: [MetricName.Commits],
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
};
