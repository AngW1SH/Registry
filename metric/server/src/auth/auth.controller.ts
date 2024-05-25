import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { User } from '@/src/admin/admin.decorator';
import {
  ApiBody,
  ApiCookieAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { LoginParams } from './auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginParams })
  @ApiResponse({
    status: 200,
    headers: {
      'Set-Cookie': {
        description: 'Sets cookie with access and refresh token',
      },
    },
  })
  async login(
    @Body('remember') remember: boolean,
    @User() user,
    @Response() res,
  ) {
    await this.authService.login(res, user, remember);
    res.status(200).send();
  }

  @Get('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiHeader({
    name: 'Cookie',
    description: 'Has to contain refresh token',
  })
  @ApiResponse({
    status: 200,
    headers: {
      'Set-Cookie': {
        description: 'Sets cookie with access token',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token not provided or invalid',
  })
  async refresh(@Request() req, @Response() res) {
    await this.authService.refresh(req, res);
    res.status(200).send();
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({
    status: 200,
    headers: {
      'Set-Cookie': {
        description: 'Clears cookie with access and refresh token',
      },
    },
  })
  async logout(@Response() res) {
    await this.authService.logout(res);
    res.status(200).send();
  }
}
