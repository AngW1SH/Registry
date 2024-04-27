import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminController } from './admin.controller';

@Module({
  imports: [PrismaModule],
  providers: [AdminService],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
