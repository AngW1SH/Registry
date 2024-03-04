import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Platform } from './platform.entity';

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
