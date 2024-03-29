import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Resource,
  ResourceCreate,
  ResourceDetailed,
  ResourceDetailedWithSnapshots,
  ResourceSnapshots,
} from './resource.entity';
import { MetricService } from 'src/metric/metric.service';
import { configs } from './config';

@Injectable()
export class ResourceService {
  constructor(
    private prisma: PrismaService,
    private metricService: MetricService,
  ) {}

  async findMany(filters: { project: string }): Promise<ResourceDetailed[]> {
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
            metric: {
              select: {
                name: true,
              },
            },
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
        name: metric.metric.name,
        data: [],
        resource: resource.id,
        params: metric.params || '[]',
        isTracked: null,
      })),
    }));
  }

  async findAll(): Promise<Resource[]> {
    const result = await this.prisma.resource.findMany();

    return result.map((resource) => ({
      id: resource.id,
      name: resource.name,
      params: resource.params,
      project: resource.projectId,
      platform: resource.platformId,
    }));
  }

  async findOne(id: string): Promise<ResourceDetailed | null> {
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
    resource: ResourceDetailed,
    snapshots: ResourceSnapshots,
  ): ResourceDetailedWithSnapshots {
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

  deleteOne(id: string) {
    return this.prisma.resource.delete({
      where: {
        id,
      },
    });
  }
}
