import { Module } from '@nestjs/common';
import { MetricGateway } from './gateway';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MetricGateway],
  exports: [MetricGateway],
})
export class MetricGatewayModule {}
