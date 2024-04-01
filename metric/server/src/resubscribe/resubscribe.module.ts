import { Module } from '@nestjs/common';
import { ResubscribeService } from './resubscribe.service';

@Module({
  providers: [ResubscribeService],
  exports: [ResubscribeService],
})
export class ResubscribeModule {}
