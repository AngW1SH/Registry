import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Project,
  ProjectCreate,
  ProjectDetailed,
  ProjectDetailedWithSnapshots,
  ProjectInList,
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

  async findAll(): Promise<ProjectInList[]> {
    // Select the project data and its resources' platform and last saved grade
    const prismaResult = await this.prisma.project.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        dateStart: true,
        dateEnd: true,
        resources: {
          select: {
            grade: true,
            platform: true,
          },
        },
      },
    });

    const result: ProjectInList[] = prismaResult.map((project) => {
      // Find all unique platform names of the project's resources
      const platformNames = project.resources.reduce((acc, cur) => {
        if (!acc.includes(cur.platform)) {
          acc.push(cur.platform);
        }
        return acc;
      }, []);

      // Find the average grade of the project's resources
      const gradeData = project.resources.reduce(
        (acc, cur) => {
          if (cur.grade != 'N/A') {
            return { sum: acc.sum + +cur.grade, count: acc.count + 1 };
          }

          return acc;
        },
        { sum: 0, count: 0 },
      );

      return {
        id: project.id,
        name: project.name,
        description: project.description,
        platforms: platformNames,
        dateStart: project.dateStart,
        dateEnd: project.dateEnd,
        grade:
          gradeData.count > 0
            ? (gradeData.sum / gradeData.count).toFixed(2)
            : 'N/A',
      };
    });

    return result;
  }

  async findOne(id: string): Promise<ProjectDetailedWithSnapshots | null> {
    // Select the project data and its members
    // Resources and metrics are queried separately
    const result = await this.prisma.project.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        dateStart: true,
        dateEnd: true,
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
                    platform: true,
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

    // Combine the member and user data
    const members: ProjectMember[] = result.members.map((member) => ({
      name: member.user.name,
      roles: member.roles,
      identifiers: member.user.identifiers.map((identifier) => ({
        platform: identifier.platform as PlatformName,
        value: identifier.value,
      })),
    }));

    // Fetch project resources and tracked tasks
    const [resources, trackedTasks] = await Promise.all([
      this.resourceService.findMany({ project: id }),
      this.taskService.list(['project:' + result.name]),
    ]);
    if (!resources) throw new Error('Failed to fetch resources');
    if (!trackedTasks) throw new Error('Failed to fetch tracked tasks');

    // Fetch project snapshots and structure them like:
    // { resourceName: { metricName: [snapshot1, snapshot2] } }
    const snapshots = structureSnapshots(
      await this.snapshotService.list('project:' + result.name),
    );
    if (!snapshots) throw new Error('Failed to fetch snapshots');

    // Distribute the snapshot data to the resources
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
      dateStart: result.dateStart,
      dateEnd: result.dateEnd,
      users: members,
      resources: trackedTasks
        ? markTrackedMetrics(trackedTasks, resourcesPopulated) // Mark if the task is tracked or not
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
      dateStart: result.dateStart,
      dateEnd: result.dateEnd,
      resources: [],
    };
  }

  async updateMetrics(newData: Project) {
    // Fetch the project data before the update
    const oldData = await this.prisma.project.findFirst({
      where: {
        id: newData.id,
      },
    });
    // There's nothing to update
    if (!oldData) return null;

    // If the name changes, the "project:..." group name changes,
    // so we have to update the group name in the core-server
    if (oldData.name !== newData.name) {
      const result = await this.taskService.updateGroupName({
        old: 'project:' + oldData.name,
        new: 'project:' + newData.name,
      });

      if (!result || !result.new) throw new Error('Failed to update tasks');
    }

    // If the dates change, we have to update them in the core-server
    // so that the tasks are started and deleted correctly
    if (
      new Date(oldData.dateStart)?.getTime() !==
        new Date(newData.dateStart)?.getTime() ||
      new Date(oldData.dateEnd)?.getTime() !==
        new Date(newData.dateEnd)?.getTime()
    ) {
      this.taskService.updateByGroupName({
        group: 'project:' + newData.name,
        created_at: newData.dateStart
          ? {
              seconds: new Date(newData.dateStart).getTime() / 1000,
              nanos: 0,
            }
          : null,
        deleted_at: newData.dateEnd
          ? {
              seconds: new Date(newData.dateEnd).getTime() / 1000,
              nanos: 0,
            }
          : null,
      });
    }
  }

  async updateOne(project: Project): Promise<Project> {
    // Before updating, try to update the data in the core-server
    await this.updateMetrics(project);

    const dateStart = new Date(project.dateStart);
    const dateEnd = new Date(project.dateEnd);

    const result = await this.prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        ...project,
        dateStart:
          dateStart instanceof Date && !isNaN(dateStart.getTime())
            ? dateStart.toISOString()
            : undefined,
        dateEnd:
          dateEnd instanceof Date && !isNaN(dateEnd.getTime())
            ? dateEnd.toISOString()
            : undefined,
      },
    });

    if (!result) throw new Error('Failed to update project');

    return result;
  }

  async deleteOne(id: string): Promise<Project> {
    const result = await this.prisma.project.delete({
      where: {
        id,
      },
    });

    if (!result) throw new Error('Failed to delete project');

    return result;
  }
}
