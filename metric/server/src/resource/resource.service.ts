import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Resource } from './resource.entity';

@Injectable()
export class ResourceService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Resource[]> {
    const result = await this.prisma.resource.findMany();

    return result.map((resource) => ({
      id: resource.id,
      name: resource.name,
      project: resource.projectId,
      platform: resource.platformId,
    }));
  }

  async findOne(id: string): Promise<Resource | null> {
    const result = await this.prisma.resource.findFirst({
      where: {
        id,
      },
    });

    return {
      id: result.id,
      name: result.name,
      project: result.projectId,
      platform: result.platformId,
    };
  }
}
