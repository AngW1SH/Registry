import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Resource,
  ResourceCreate,
  ResourceDetailed,
  ResourceSnapshots,
  ResourceWithMetrics,
} from './resource.entity';
import { MetricService } from 'src/metric/metric.service';
import { configs } from './config';
import { Metric, MetricDetailed } from '../metric/metric.entity';
import { ResourceConfig } from './config/types';
import { MetricConfig } from '../metric/config/types';
import { metricConfig } from '../metric/config/instances/metricConfig';
import { PlatformName } from '../platform/platform.entity';

@Injectable()
export class ResourceService {
  constructor(
    private prisma: PrismaService,
    private metricService: MetricService,
  ) {}

  async findMany(filters: { project: string }): Promise<ResourceWithMetrics[]> {
    // Select resources with metrics
    const result = await this.prisma.resource.findMany({
      where: {
        projectId: filters.project,
      },
      select: {
        id: true,
        name: true,
        projectId: true,
        platform: true,
        params: true,
        metrics: {
          select: {
            id: true,
            name: true,
            params: true,
            snapshotBased: true,
          },
        },
      },
    });

    result.forEach((resource) => {
      resource.metrics.forEach((metric) => {
        // Check if we have a config for this metric
        const config: MetricConfig = metricConfig[metric.name];
        const params = JSON.parse(metric.params);
        if (!config) return;

        // If some params are missing, add them
        config.params.forEach((param) => {
          if (!params.find((p) => p.name === param.name)) {
            params.push(param);
          }
        });

        metric.params = JSON.stringify(params);
      });

      // Check if we have a config for this resource
      const config: ResourceConfig = configs[resource.platform];
      const params = JSON.parse(resource.params);
      if (!config) return;

      config.data.forEach((param) => {
        // If some params are missing, add them
        if (!params.find((p) => p.prop === param.prop)) {
          params.push(param);
        }
      });

      resource.params = JSON.stringify(params);
    });

    return result.map((resource) => ({
      id: resource.id,
      name: resource.name,
      project: resource.projectId,
      params: resource.params,
      platform: resource.platform,
      metrics: resource.metrics.map((metric) => ({
        id: metric.id,
        name: metric.name,
        data: [],
        resource: resource.id,
        params: metric.params || '[]',
        snapshotBased: metric.snapshotBased,
        isTracked: null,
      })),
    }));
  }

  async findOne(id: string): Promise<ResourceWithMetrics | null> {
    const result = await this.prisma.resource.findFirst({
      where: {
        id,
      },
    });

    if (!result) return null;

    const metrics = await this.metricService.findMany({ resource: result.id });

    return {
      id: result.id,
      name: result.name,
      params: result.params,
      project: result.projectId,
      platform: result.platform,
      metrics,
    };
  }

  async createOne(resource: ResourceCreate): Promise<ResourceDetailed | null> {
    // Find out if we support this platform
    console.log(Object.entries(PlatformName));
    console.log(resource.platform);
    const platform = Object.entries(PlatformName).find(
      (entry) => entry[1] === resource.platform,
    )?.[1];
    if (!platform) throw new Error('Platform not found');

    // Check if we have a config for this resource
    const config = configs[platform];
    if (!config) throw new Error('Platform not found');

    const result = await this.prisma.resource.create({
      data: {
        name: resource.name,
        params: JSON.stringify(config.data),
        platform: platform,
        project: {
          connect: {
            id: resource.project,
          },
        },
      },
    });

    if (!result) throw new Error('Failed to create resource');

    return {
      id: result.id,
      name: result.name,
      params: result.params,
      project: result.projectId,
      platform: result.platform,
      metrics: [],
    };
  }

  async updateOne(resource: Resource): Promise<Resource> {
    // Find out if we support this platform
    const platform = Object.entries(PlatformName).find(
      (entry) => entry[1] === resource.platform,
    )[1];
    if (!platform) throw new Error('Platform not found');

    const result = await this.prisma.resource.update({
      where: {
        id: resource.id,
      },
      data: {
        name: resource.name,
        params: resource.params,
        projectId: resource.project,
        platform: platform,
      },
    });
    if (!result) throw new Error('Failed to update resource');

    return {
      id: result.id,
      name: result.name,
      params: result.params,
      project: result.projectId,
      platform: result.platform,
    };
  }

  populateWithSnapshots(
    resource: ResourceWithMetrics,
    snapshots: ResourceSnapshots,
  ): ResourceDetailed {
    return {
      ...resource,
      metrics: resource.metrics.map((metric) =>
        this.metricService.populateWithSnapshots(
          metric,
          snapshots ? snapshots[metric.name] : [],
        ),
      ),
    };
  }

  async deleteOne(id: string): Promise<Resource> {
    // Stop tracking metrics first (and delete the existing snapshots)
    try {
      await this.stopTracking(id, true);
    } catch (error) {
      throw new Error('Failed to stop tracking metrics');
    }

    const result = await this.prisma.resource.delete({
      where: {
        id,
      },
    });
    if (!result) throw new Error('Failed to delete resource');

    return {
      id: result.id,
      name: result.name,
      params: result.params,
      project: result.projectId,
      platform: result.platform,
    };
  }

  async getMetrics(id: string): Promise<Metric[]> {
    const metricsPrisma = await this.prisma.metric.findMany({
      where: {
        resource: {
          id,
        },
      },
      select: {
        id: true,
        params: true,
        name: true,
        resourceId: true,
        snapshotBased: true,
      },
    });

    return metricsPrisma.map((metric) => ({
      id: metric.id,
      name: metric.name,
      resource: metric.resourceId,
      snapshotBased: metric.snapshotBased,
      params: metric.params || '[]',
    }));
  }

  async createAllMetrics(resourceId: string) {
    const metrics = await this.metricService.listAll();
    const result: MetricDetailed[] = [];

    metrics.forEach(async (metric) => {
      // Check if the metric already exists
      const metricInDB = await this.prisma.metric.findFirst({
        where: {
          name: metric.name,
          resourceId: resourceId,
        },
      });
      if (metricInDB) return;

      const metricCreateResult = await this.metricService.create({
        params: '',
        name: metric.name,
        resource: resourceId,
      });

      if (metricCreateResult) result.push(...metricCreateResult);
    });

    return result;
  }

  async startTracking(id: string) {
    const metrics = await this.getMetrics(id);
    if (!metrics) throw new Error("Couldn't get metrics");

    const result = await Promise.all(
      metrics.map((metric) => this.metricService.start(metric)),
    );

    return result;
  }

  async stopTracking(id: string, deleteSnapshots?: boolean) {
    const metrics = await this.getMetrics(id);
    if (!metrics) throw new Error("Couldn't get metrics");

    const result = await Promise.all(
      metrics.map((metric) =>
        this.metricService.stop(metric.id, deleteSnapshots || false),
      ),
    );

    return result;
  }
}
