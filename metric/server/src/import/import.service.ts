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
import { ResourceService } from '../resource/resource.service';
import { PlatformName } from '../platform/platform.entity';

@Injectable()
export class ImportService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
    private resourceService: ResourceService,
  ) {}

  async createOrUpdateProject(project: ImportProject) {
    // See if project already exists
    const findProject = await this.prisma.project.findFirst({
      where: {
        id: '' + project.id,
      },
    });

    if (findProject) {
      // Note that this will also update the data in the core-server if neccessary
      const updateProject = await this.projectService.updateOne({
        id: findProject.id,
        name: project.name,
        description: project.description,
        dateStart: project.dateStart ? new Date(project.dateStart) : null,
        dateEnd: project.dateEnd ? new Date(project.dateEnd) : null,
      });

      return updateProject;
    }

    // If not found, create the project
    const createProject = await this.prisma.project.create({
      data: {
        id: '' + project.id,
        name: project.name,
        description: project.description,
        dateStart: project.dateStart ? new Date(project.dateStart) : null,
        dateEnd: project.dateEnd ? new Date(project.dateEnd) : null,
      },
    });

    return createProject;
  }

  async createOrUpdateResource(resource: ImportResource, project: Project) {
    // See if resource already exists
    const findResource = await this.prisma.resource.findFirst({
      where: {
        name: resource.name,
        projectId: project.id,
      },
    });

    // Find out if we support this platform
    const platform = Object.entries(PlatformName).find(
      (entry) => entry[1].toLowerCase() === resource.platform.toLowerCase(),
    )?.[1];
    if (!platform) {
      throw new Error('Platform not found');
    }

    // Fill the resource params with default values
    const config: ResourceConfig = configs[resource.platform];
    const params = JSON.parse(resource.params);
    if (!config) return;

    config.data.forEach((param) => {
      if (!params.find((p) => p.prop === param.prop)) {
        // Add provided param values whenever possible
        params.push(param);
      }
    });
    resource.params = JSON.stringify(params);

    // Create or update the resource
    if (findResource) {
      const updateResource = await this.prisma.resource.update({
        where: {
          id: findResource.id,
        },
        data: {
          name: resource.name,
          params: resource.params,
          platform: platform,
        },
      });

      return updateResource;
    }

    const createResource = await this.prisma.resource.create({
      data: {
        name: resource.name,
        params: resource.params,
        projectId: project.id,
        platform: platform,
      },
    });

    // Also automatically create all the metrics for the resource
    await this.resourceService.createAllMetrics(createResource.id);

    // and start tracking them
    await this.resourceService.startTracking(createResource.id);

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
          console.log(identifier);
          // Find out if we support this platform
          const platform = Object.entries(PlatformName).find(
            (entry) =>
              entry[1].toLowerCase() === identifier.platform.toLowerCase(),
          )?.[1];
          if (!platform) throw new Error('Platform not found');

          return {
            platform: platform,
            value: identifier.value,
          };
        }),
      )
    ).filter((identifier) => identifier !== null);

    if (findUser) {
      // Delete all the previous identifiers
      const deleteIdentifiers = await this.prisma.identifier.deleteMany({
        where: {
          userId: findUser.id,
        },
      });

      // Save the new identifiers
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
    // See if member already exists
    const findMember = await this.prisma.member.findFirst({
      where: {
        user: {
          name: member.name,
        },
        projectId: project.id,
      },
    });

    // Create or update the member
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
