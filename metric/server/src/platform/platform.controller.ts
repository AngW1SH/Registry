import { Controller, Get, Param } from '@nestjs/common';
import { PlatformService } from './platform.service';

@Controller('platform')
export class PlatformController {
  constructor(private platformService: PlatformService) {}

  @Get()
  findAll() {
    return this.platformService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.platformService.findOne(id);
  }
}
