import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    const result = await this.prisma.project.findMany();

    return result;
  }

  async findOne(id: string): Promise<Project | null> {
    const result = await this.prisma.project.findFirst({
      where: {
        id,
      },
    });

    return result;
  }
}
