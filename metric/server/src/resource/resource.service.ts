import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Resource, ResourceDetailed } from './resource.entity';
import { MetricService } from 'src/metric/metric.service';

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
        metrics: {
          select: {
            id: true,
            metric: {
              select: {
                name: true,
              },
            },
            data: true,
          },
        },
      },
    });

    return result.map((resource) => ({
      id: resource.id,
      name: resource.name,
      project: resource.projectId,
      platform: resource.platformId,
      metrics: resource.metrics.map((metric) => ({
        id: metric.id,
        name: metric.metric.name,
        data: metric.data,
        resource: resource.id,
        params: '',
      })),
    }));
  }

  async findAll(): Promise<Resource[]> {
    const result = await this.prisma.resource.findMany();

    return result.map((resource) => ({
      id: resource.id,
      name: resource.name,
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
      project: result.projectId,
      platform: result.platformId,
      metrics,
    };
  }
}
