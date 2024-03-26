import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user, @Response() res) {
    await this.authService.login(res, user);
    res.status(200).send();
  }

  @Get('refresh')
  async refresh(@Request() req, @Response() res) {
    await this.authService.refresh(req, res);
    res.status(200).send();
  }
}
