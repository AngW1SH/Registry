import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Project,
  ProjectCreate,
  ProjectDetailed,
  ProjectDetailedWithSnapshots,
  ProjectMember,
} from './project.entity';
import { ResourceService } from 'src/resource/resource.service';
import { SnapshotService } from 'src/snapshot/snapshot.service';
import { structureSnapshots } from './utils/structureSnapshots';
import { TaskService } from 'src/task/task.service';
import { markTrackedMetrics } from './utils/markTrackedMetrics';
import { PlatformName } from '../platform/platform.entity';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private resourceService: ResourceService,
    private snapshotService: SnapshotService,
    private taskService: TaskService,
  ) {}

  async findAll(): Promise<Project[]> {
    const result = await this.prisma.project.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return result;
  }

  async findOne(id: string): Promise<ProjectDetailedWithSnapshots | null> {
    const result = await this.prisma.project.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        members: {
          select: {
            id: true,
            roles: true,
            user: {
              select: {
                id: true,
                name: true,
                identifiers: {
                  select: {
                    platform: {
                      select: {
                        name: true,
                      },
                    },
                    value: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!result) {
      return null;
    }

    const members: ProjectMember[] = result.members.map((member) => ({
      name: member.user.name,
      roles: member.roles,
      identifiers: member.user.identifiers.map((identifier) => ({
        platform: identifier.platform.name as PlatformName,
        value: identifier.value,
      })),
    }));

    const [resources, trackedTasks] = await Promise.all([
      this.resourceService.findMany({ project: id }),
      this.taskService.list(['project:' + result.name]),
    ]);

    if (!resources) throw new Error('Failed to fetch resources');
    if (!trackedTasks) throw new Error('Failed to fetch tracked tasks');

    const snapshots = structureSnapshots(
      await this.snapshotService.list('project:' + result.name),
    );

    if (!snapshots) throw new Error('Failed to fetch snapshots');

    let resourcesPopulated = resources.map((resource) =>
      this.resourceService.populateWithSnapshots(
        resource,
        snapshots[resource.name] || {},
      ),
    );

    return {
      id: result.id,
      name: result.name,
      description: result.description,
      users: members,
      resources: trackedTasks
        ? markTrackedMetrics(trackedTasks, resourcesPopulated)
        : resourcesPopulated,
    };
  }

  async create(project: ProjectCreate): Promise<ProjectDetailed> {
    const result = await this.prisma.project.create({
      data: {
        name: project.name,
        description: project.description,
      },
    });

    if (!result) throw new Error('Failed to create project');

    return {
      id: result.id,
      name: result.name,
      description: result.description,
      resources: [],
    };
  }

  async updateOne(project: Project): Promise<Project> {
    const oldData = await this.prisma.project.findFirst({
      where: {
        id: project.id,
      },
    });

    if (!oldData) throw new Error('Project not found');

    if (oldData.name !== project.name) {
      const result = await this.taskService.updateGroupName({
        old: 'project:' + oldData.name,
        new: 'project:' + project.name,
      });

      if (!result || !result.new) throw new Error('Failed to update tasks');
    }

    const result = await this.prisma.project.update({
      where: {
        id: project.id,
      },
      data: project,
    });

    if (!result) throw new Error('Failed to update project');

    return result;
  }

  async deleteOne(id: string) {
    const result = await this.prisma.project.delete({
      where: {
        id,
      },
    });

    if (!result) throw new Error('Failed to delete project');

    return result;
  }
}
