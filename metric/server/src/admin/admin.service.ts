import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Admin } from './admin.entity';
@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  async findByName(name: string): Promise<Admin | null> {
    const result = await this.prisma.admin.findFirst({
      where: {
        name,
      },
    });

    return result;
  }

  async findById(id: string): Promise<Admin | null> {
    const result = await this.prisma.admin.findFirst({
      where: {
        id,
      },
    });

    return result;
  }
}
