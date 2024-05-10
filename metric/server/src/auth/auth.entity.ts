import { ApiProperty } from '@nestjs/swagger';

export interface LoginParams {
  username: string;
  password: string;
}

export class LoginParams {
  @ApiProperty({ name: 'username', example: 'admin' })
  username: string;

  @ApiProperty({ name: 'password', example: '123456' })
  password: string;
}
