import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from './admin.decorator';
import { AdminProfile } from './admin.entity';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class AdminController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({ type: AdminProfile })
  async getProfile(@User() user) {
    return user;
  }
}
