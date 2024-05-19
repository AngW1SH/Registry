import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ImportMember,
  ImportProject,
  ImportResource,
  ImportUser,
} from './import.entity';
import { ResourceConfig } from '../resource/config/types';
import { configs } from '../resource/config';
import { Project } from '../project/project.entity';
import { User } from '@prisma/client';
import { ProjectService } from '../project/project.service';

@Injectable()
export class ImportService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
  ) {}

  async createOrUpdateProject(project: ImportProject) {
    const findProject = await this.prisma.project.findFirst({
      where: {
        id: '' + project.id,
      },
    });

    if (findProject) {
      await this.projectService.updateMetrics({
        id: findProject.id,
        name: project.name,
        description: project.description,
        dateStart: project.dateStart ? new Date(project.dateStart) : null,
        dateEnd: project.dateEnd ? new Date(project.dateEnd) : null,
      });

      const updateProject = await this.prisma.project.update({
        where: {
          id: findProject.id,
        },
        data: {
          name: project.name,
          description: project.description,
          dateStart: project.dateStart ? new Date(project.dateStart) : null,
          dateEnd: project.dateEnd ? new Date(project.dateEnd) : null,
        },
      });

      return updateProject;
    }

    const createProject = await this.prisma.project.create({
      data: {
        id: '' + project.id,
        name: project.name,
        description: project.description,
      },
    });

    return createProject;
  }

  async createOrUpdateResource(resource: ImportResource, project: Project) {
    const findResource = await this.prisma.resource.findFirst({
      where: {
        name: resource.name,
        projectId: project.id,
      },
    });

    const platform = await this.prisma.platform.findFirst({
      where: {
        name: resource.platform,
      },
    });

    if (!platform) {
      throw new Error('Platform not found');
    }

    const config: ResourceConfig = configs[resource.platform];
    const params = JSON.parse(resource.params);
    if (!config) return;
    config.data.forEach((param) => {
      if (!params.find((p) => p.prop === param.prop)) {
        params.push(param);
      }
    });
    resource.params = JSON.stringify(params);

    if (findResource) {
      const updateResource = await this.prisma.resource.update({
        where: {
          id: findResource.id,
        },
        data: {
          name: resource.name,
          params: resource.params,
          platformId: platform.id,
        },
      });

      return updateResource;
    }

    const createResource = await this.prisma.resource.create({
      data: {
        name: resource.name,
        params: resource.params,
        projectId: project.id,
        platformId: platform.id,
      },
    });

    return createResource;
  }

  async createOrUpdateUser(user: ImportUser) {
    const findUser = await this.prisma.user.findFirst({
      where: {
        name: user.name,
      },
    });

    const identifiers = (
      await Promise.all(
        user.identifiers.map(async (identifier) => {
          const platform = await this.prisma.platform.findFirst({
            where: {
              name: identifier.platform,
            },
          });

          if (!platform) {
            return null;
          }

          return {
            platformId: platform.id,
            value: identifier.value,
          };
        }),
      )
    ).filter((identifier) => identifier !== null);

    if (findUser) {
      const deleteIdentifiers = await this.prisma.identifier.deleteMany({
        where: {
          userId: findUser.id,
        },
      });

      const updateUser = await this.prisma.user.update({
        where: {
          id: findUser.id,
        },
        data: {
          identifiers: {
            create: identifiers,
          },
        },
      });

      return updateUser;
    }

    const createUser = await this.prisma.user.create({
      data: {
        name: user.name,
        identifiers: {
          create: identifiers,
        },
      },
    });

    return createUser;
  }

  async createOrUpdateMember(
    member: ImportMember,
    project: Project,
    user: User,
  ) {
    const findMember = await this.prisma.member.findFirst({
      where: {
        user: {
          name: member.name,
        },
        projectId: project.id,
      },
    });

    if (findMember) {
      const updateMember = await this.prisma.member.update({
        where: {
          id: findMember.id,
        },
        data: {
          roles: member.roles,
        },
      });

      return updateMember;
    }

    const createMember = await this.prisma.member.create({
      data: {
        userId: user.id,
        roles: member.roles,
        projectId: project.id,
      },
    });

    return createMember;
  }

  async project(data: ImportProject) {
    const project = await this.createOrUpdateProject(data);

    const resources = await Promise.all(
      data.resources.map((resource) =>
        this.createOrUpdateResource(resource, project),
      ),
    );

    const users = await Promise.all(
      data.members.map((member) => this.createOrUpdateUser(member)),
    );

    const members = await Promise.all(
      data.members.map((member) =>
        this.createOrUpdateMember(
          member,
          project,
          users.find((u) => u.name === member.name),
        ),
      ),
    );

    return { project, resources, users, members };
  }
}
