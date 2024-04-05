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
import { Metric } from '../metric/metric.entity';

@Injectable()
export class ResourceService {
  constructor(
    private prisma: PrismaService,
    private metricService: MetricService,
  ) {}

  async findMany(filters: { project: string }): Promise<ResourceWithMetrics[]> {
    const result = await this.prisma.resource.findMany({
      where: {
        projectId: filters.project,
      },
      select: {
        id: true,
        name: true,
        projectId: true,
        platformId: true,
        params: true,
        metrics: {
          select: {
            id: true,
            name: true,
            params: true,
          },
        },
      },
    });

    return result.map((resource) => ({
      id: resource.id,
      name: resource.name,
      project: resource.projectId,
      params: resource.params,
      platform: resource.platformId,
      metrics: resource.metrics.map((metric) => ({
        id: metric.id,
        name: metric.name,
        data: [],
        resource: resource.id,
        params: metric.params || '[]',
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
      platform: result.platformId,
      metrics,
    };
  }

  async createOne(resource: ResourceCreate): Promise<ResourceDetailed | null> {
    const platform = await this.prisma.platform.findFirst({
      where: {
        id: resource.platform,
      },
    });

    if (!platform) throw new Error('Platform not found');

    const config = configs[platform.name];

    if (!config) throw new Error('Platform not found');

    const result = await this.prisma.resource.create({
      data: {
        name: resource.name,
        params: JSON.stringify(config.data),
        platform: {
          connect: {
            id: resource.platform,
          },
        },
        project: {
          connect: {
            id: resource.project,
          },
        },
      },
    });

    return {
      id: result.id,
      name: result.name,
      params: result.params,
      project: result.projectId,
      platform: result.platformId,
      metrics: [],
    };
  }

  async updateOne(resource: Resource): Promise<Resource> {
    const result = await this.prisma.resource.update({
      where: {
        id: resource.id,
      },
      data: {
        name: resource.name,
        params: resource.params,
        projectId: resource.project,
        platformId: resource.platform,
      },
    });

    return {
      id: result.id,
      name: result.name,
      params: result.params,
      project: result.projectId,
      platform: result.platformId,
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
    const result = await this.prisma.resource.delete({
      where: {
        id,
      },
    });

    return {
      id: result.id,
      name: result.name,
      params: result.params,
      project: result.projectId,
      platform: result.platformId,
    };
  }

  async startTracking(id: string) {
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
      },
    });

    const metrics: Metric[] = metricsPrisma.map((metric) => ({
      id: metric.id,
      name: metric.name,
      data: [],
      resource: metric.resourceId,
      params: metric.params || '[]',
      isTracked: null,
    }));

    const result = await Promise.all(
      metrics.map((metric) => this.metricService.start(metric)),
    );

    return result;
  }

  async stopTracking(id: string) {
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
      },
    });

    const metrics: Metric[] = metricsPrisma.map((metric) => ({
      id: metric.id,
      name: metric.name,
      data: [],
      resource: metric.resourceId,
      params: metric.params || '[]',
      isTracked: null,
    }));

    const result = await Promise.all(
      metrics.map((metric) => this.metricService.stop(metric.id)),
    );

    return result;
  }
}
