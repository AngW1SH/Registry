import { Injectable } from '@nestjs/common';

@Injectable()
export class PlatformService {
  findAll() {
    return 'This action returns all platforms';
  }

  findOne(id: string) {
    return `This action returns a ${id} platform`;
  }
}
