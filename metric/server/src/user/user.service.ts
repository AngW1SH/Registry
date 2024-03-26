import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async findOne(name: string): Promise<User | null> {
    const result = await this.prisma.user.findFirst({
      where: {
        name,
      },
    });

    return result;
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    return result;
  }
}
