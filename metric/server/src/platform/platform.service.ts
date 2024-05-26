import { Injectable } from '@nestjs/common';
import { Platform, PlatformName } from './platform.entity';

@Injectable()
export class PlatformService {
  async findAll(): Promise<Platform[]> {
    const result = Object.entries(PlatformName).map(([key, value]) => ({
      name: value,
    }));

    return result;
  }

  async findOne(name: string): Promise<Platform | null> {
    const result = Object.entries(PlatformName).find(
      ([key, value]) => value === name,
    );

    if (!result) return null;

    return { name: result[1] };
  }
}
