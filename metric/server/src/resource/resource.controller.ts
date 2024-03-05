import { Controller, Get, Param } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceDTO, ResourceDetailedDTO } from './resource.entity';

@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Get()
  async findAll(): Promise<ResourceDTO[]> {
    return this.resourceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResourceDetailedDTO | null> {
    return this.resourceService.findOne(id);
  }
}
