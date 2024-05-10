import { Controller, Get, Param } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { PlatformDTO } from './platform.entity';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('platform')
export class PlatformController {
  constructor(private platformService: PlatformService) {}

  @Get()
  @ApiOperation({ summary: 'Get all platforms' })
  @ApiResponse({ status: 200, type: PlatformDTO, isArray: true })
  async findAll(): Promise<PlatformDTO[]> {
    return this.platformService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get platform by ID' })
  @ApiOkResponse({ status: 200, type: PlatformDTO })
  @ApiNotFoundResponse({ status: 404, type: null })
  async findOne(@Param('id') id: string): Promise<PlatformDTO | null> {
    return this.platformService.findOne(id);
  }
}
