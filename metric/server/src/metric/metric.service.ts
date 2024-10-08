import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AbstractMetricDetailed,
  Metric,
  MetricCreate,
  MetricDetailed,
  MetricSnapshot,
} from './metric.entity';
import { TaskService } from 'src/task/task.service';
import { durationToSeconds } from 'utils/duration';
import { TaskCreate } from 'src/task/task.entity';
import { MetricName } from './config/instances/metricNames';
import { metricConfig } from './config/instances/metricConfig';
import { SnapshotBasedMetricConfig } from './config/types';

@Injectable()
export class MetricService {
  constructor(
    private prisma: PrismaService,
    private taskService: TaskService,
  ) {}

  async findMany(filters: { resource: string }): Promise<Metric[]> {
    const result = await this.prisma.metric.findMany({
      where: {
        resourceId: filters.resource,
      },
      select: {
        id: true,
        name: true,
        resourceId: true,
        params: true,
        snapshotBased: true,
      },
    });

    return result.map((metric) => ({
      id: metric.id,
      name: metric.name,
      snapshotBased: metric.snapshotBased,
      resource: metric.resourceId,
      params: metric.params || '[]',
    }));
  }

  // Get all the metrics' metadata
  async listAll(): Promise<AbstractMetricDetailed[]> {
    const result = Object.values(MetricName).map((key) => ({
      name: key,
      dependencies: metricConfig[key]?.dependencies || [],
      snapshotBased: metricConfig[key]?.snapshotBased || false,
      platform: metricConfig[key]?.platform,
    }));

    return result;
  }

  async updateParams(metric: Metric): Promise<Metric> {
    // Check if the params are a valid JSON
    try {
      JSON.parse(metric.params);
    } catch {
      throw new Error('Invalid JSON in metric.params');
    }

    // Try to update in the core-server first
    try {
      // See if we support this metric
      const config = metricConfig[metric.name];

      // No point in making a request to the core-server if the metric is not snapshot-based
      if (config && config.snapshotBased) {
        const result = await this.update(metric);
      }
    } catch {
      throw new Error('Failed to update the metric');
    }

    const result = await this.prisma.metric.update({
      where: {
        id: metric.id,
      },
      data: {
        params: metric.params,
      },
      select: {
        id: true,
        name: true,
        resourceId: true,
        params: true,
        snapshotBased: true,
      },
    });

    return {
      name: result.name,
      id: result.id,
      resource: result.resourceId,
      params: result.params,
    };
  }

  async convertToTask(metric: MetricCreate): Promise<TaskCreate> {
    let params = metric.params ? JSON.parse(metric.params) : {};

    // extract weight and updateRate
    const weight = params.find((param) => param.name == 'weight');
    const updateRate = params.find((param) => param.name == 'updateRate');
    if (!weight) {
      throw new Error('Missing "weight" parameter');
    }
    if (!updateRate) {
      throw new Error('Missing "updateRate" parameter');
    }

    // remove weight and updateRate from params
    params = params.filter(
      (param) => param.name != 'updateRate' && param.name != 'weight',
    );

    const contextData = await this.prisma.resource.findFirst({
      where: {
        id: metric.resource,
      },
      select: {
        name: true,
        params: true,
        project: {
          select: {
            id: true,
            name: true,
            dateStart: true,
            dateEnd: true,
          },
        },
      },
    });

    // Extract the names that will be used for task group names
    const [projectName, resourceName] = [
      contextData.project.name,
      contextData.name,
    ];
    if (!projectName) {
      throw new Error('Failed to find project name');
    }
    if (!resourceName) {
      throw new Error('Failed to find resource name');
    }

    // Extract the params to merge with the metric params
    const resourceParams = JSON.parse(contextData.params);

    return {
      metric: metric.name,
      weight: +weight,
      created_at: contextData.project.dateStart
        ? {
            seconds: new Date(contextData.project.dateStart).getTime() / 1000,
            nanos: 0,
          }
        : null,
      deleted_at: contextData.project.dateEnd
        ? {
            seconds: new Date(contextData.project.dateEnd).getTime() / 1000,
            nanos: 0,
          }
        : null,
      data: JSON.stringify([
        ...params,
        ...resourceParams,
        {
          type: 'text',
          name: 'projectId',
          value: contextData.project.id,
        },
      ]),
      update_rate: {
        seconds: durationToSeconds(
          updateRate?.value || { number: 1, unitOfTime: 'minutes' },
        ),
        nanos: 0,
      },
      groups: ['project:' + projectName, 'resource:' + resourceName],
      is_public:
        metricConfig[metric.name]?.snapshotBased === true
          ? (metricConfig[metric.name] as SnapshotBasedMetricConfig).isPublic
          : false,
    };
  }

  async start(metric: MetricCreate) {
    // Check if we support this metric and if it is snapshot-based,
    // meaning that there's even a point in "starting" it
    const config = metricConfig[metric.name];
    if (config && !config.snapshotBased) {
      return;
    }

    const task = await this.convertToTask(metric);
    return this.taskService.start(task);
  }

  async update(metric: MetricCreate) {
    // Check if we support this metric and if it is snapshot-based,
    // meaning that there's even a point in "starting" it
    const config = metricConfig[metric.name];
    if (config && !config.snapshotBased) {
      return;
    }

    const task = await this.convertToTask(metric);
    return this.taskService.update(task);
  }

  // deleteSnapshots: true - for the "deleteMetric" endpoint
  // deleteSnapshots: false - for the "stopMetric" endpoint
  async stop(id: string, deleteSnapshots: boolean) {
    const metric = await this.prisma.metric.findFirst({
      where: {
        id,
      },
      select: {
        name: true,
        resource: {
          select: {
            name: true,
            project: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Check if we support this metric and if it is snapshot-based,
    // meaning that there's even a point in "starting" it
    const config = metricConfig[metric.name];
    if (config && !config.snapshotBased) {
      return;
    }
    if (!metric) {
      throw new Error('Metric not found');
    }

    // Extract the names that will be used for task group names
    const projectName = metric?.resource?.project?.name;
    const resourceName = metric?.resource?.name;
    if (!projectName) {
      throw new Error('Failed to find project name');
    }
    if (!resourceName) {
      throw new Error('Failed to find resource name');
    }

    return this.taskService.stop({
      metric: metric.name,
      groups: ['project:' + projectName, 'resource:' + resourceName],
      delete_snapshots: deleteSnapshots,
    });
  }

  async create(metric: MetricCreate): Promise<MetricDetailed[]> {
    // Check if we support this metric
    const config = metricConfig[metric.name];
    if (!config) throw new Error('Metric config not found');
    if (!config.dependencies) throw new Error('Metric dependencies not found');

    // Check if the resource exists
    const resource = await this.prisma.resource.findFirst({
      where: {
        id: metric.resource,
      },
      select: {
        platform: true,
      },
    });
    if (!resource) {
      throw new Error('Resource not found');
    }
    if (resource.platform !== config.platform) {
      throw new Error('Platform mismatch');
    }

    const res: MetricDetailed[] = [];

    // recursively create dependencies
    const depsCreateRequests = await Promise.all(
      config.dependencies.map((name) => this.create({ ...metric, name })),
    );
    // flatten the array to later return all of the created metrics
    depsCreateRequests.forEach((metric) => res.push(...metric));

    try {
      // Start the metric in the core-server if it's snapshot-based
      if (config.snapshotBased) {
        const result = await this.start({
          ...metric,
          params: JSON.stringify(config.params),
        });

        if (!result || !result.id) return [];
      }
    } catch {
      throw new Error('Failed to start the metric');
    }

    const result = await this.prisma.metric.create({
      data: {
        params: JSON.stringify(config.params),
        name: metric.name,
        resource: {
          connect: {
            id: metric.resource,
          },
        },
      },
      select: {
        id: true,
        name: true,
        resourceId: true,
        params: true,
      },
    });

    res.push({
      id: result.id,
      name: result.name,
      resource: result.resourceId,
      params: result.params || '[]',
      data: [],
      isTracked: true,
    });

    return res;
  }

  async deleteOne(id): Promise<Metric | null> {
    try {
      // Will not throw an error if the metric is not snapshotBased
      const result = await this.stop(id, true);
    } catch (err) {
      throw new Error('Failed to stop the metric');
    }

    const result = await this.prisma.metric.delete({
      where: {
        id,
      },
      select: {
        id: true,
        params: true,
        name: true,
        resource: {
          select: {
            id: true,
          },
        },
        snapshotBased: true,
      },
    });
    if (!result) {
      throw new Error('Failed to delete the metric');
    }

    return {
      id: result.id,
      name: result.name,
      resource: result.resource.id,
      params: result.params,
    };
  }

  populateWithSnapshots(
    metric: Metric,
    snapshots?: MetricSnapshot[],
  ): MetricDetailed {
    return {
      ...metric,
      data:
        snapshots?.map((snapshot) => ({
          error: snapshot.error,
          data: snapshot.data ? JSON.parse(snapshot.data) : '',
          timestamp: snapshot.timestamp,
        })) || [],
    };
  }

  async execute(metric: Metric) {
    // Check if we support this metric and if it is snapshot-based
    const config = metricConfig[metric.name];
    if (!config) throw new Error('Metric config not found');
    if (!config.dependencies) throw new Error('Metric dependencies not found');

    const task = await this.convertToTask(metric);
    if (!task || !task.metric || !task.groups) {
      throw new Error('Failed to convert metric to task');
    }

    const result = await this.taskService.forceExecute({
      task,
      groups: task.groups,
    });

    if (!result) {
      throw new Error('Failed to force execute the metric');
    }
  }
}
