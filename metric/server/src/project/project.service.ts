import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Project, ProjectCreate, ProjectDetailed } from './project.entity';
import { ResourceService } from 'src/resource/resource.service';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private resourceService: ResourceService,
  ) {}

  async findAll(): Promise<Project[]> {
    const result = await this.prisma.project.findMany();

    return result;
  }

  async findOne(id: string): Promise<ProjectDetailed | null> {
    const result = await this.prisma.project.findFirst({
      where: {
        id,
      },
    });

    const resources = await this.resourceService.findMany({ project: id });

    return {
      id: result.id,
      name: result.name,
      resources,
    };
  }

  async create(project: ProjectCreate): Promise<ProjectDetailed> {
    const result = await this.prisma.project.create({
      data: {
        name: project.name,
      },
    });

    return {
      id: result.id,
      name: result.name,
      resources: [],
    };
  }
}
