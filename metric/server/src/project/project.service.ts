import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Project,
  ProjectCreate,
  ProjectDetailed,
  ProjectDetailedWithSnapshots,
} from './project.entity';
import { ResourceService } from 'src/resource/resource.service';
import { SnapshotService } from 'src/snapshot/snapshot.service';
import { structureSnapshots } from './utils/structureSnapshots';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private resourceService: ResourceService,
    private snapshotService: SnapshotService,
  ) {}

  async findAll(): Promise<Project[]> {
    const result = await this.prisma.project.findMany();

    return result;
  }

  async findOne(id: string): Promise<ProjectDetailedWithSnapshots | null> {
    const result = await this.prisma.project.findFirst({
      where: {
        id,
      },
    });

    const resources = await this.resourceService.findMany({ project: id });

    const snapshots = structureSnapshots(
      await this.snapshotService.list('project:' + result.name),
    );

    const resourcesPopulated = resources.map((resource) =>
      this.resourceService.populateWithSnapshots(
        resource,
        snapshots[resource.name],
      ),
    );

    return {
      id: result.id,
      name: result.name,
      resources: resourcesPopulated,
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
