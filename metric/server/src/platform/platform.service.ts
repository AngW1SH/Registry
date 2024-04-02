import { Injectable } from '@nestjs/common';
import { Platform } from './platform.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlatformService {
  constructor(private prisma: PrismaService) {}
  async findAll(): Promise<Platform[]> {
    const result = await this.prisma.platform.findMany();
    return result;
  }

  async findOne(id: string): Promise<Platform | null> {
    const result = await this.prisma.platform.findFirst({
      where: {
        id,
      },
    });
    return result;
  }
}
