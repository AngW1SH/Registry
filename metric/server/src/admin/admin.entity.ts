import { ApiProperty } from '@nestjs/swagger';

export interface Admin {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class AdminProfile {
  @ApiProperty({ name: 'id', example: '123' })
  id: string;

  @ApiProperty({ name: 'name', example: 'admin' })
  name: string;

  @ApiProperty({ name: 'email', example: 'admin@example.com' })
  email: string;
}
