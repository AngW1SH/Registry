import { Controller, Get, Param } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { PlatformDTO } from './platform.entity';

@Controller('platform')
export class PlatformController {
  constructor(private platformService: PlatformService) {}

  @Get()
  async findAll(): Promise<PlatformDTO[]> {
    return this.platformService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PlatformDTO | null> {
    return this.platformService.findOne(id);
  }
}
