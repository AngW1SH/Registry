import { Test, TestingModule } from '@nestjs/testing';
import { ResubscribeService } from './resubscribe.service';

describe('ResubscribeService', () => {
  let service: ResubscribeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResubscribeService],
    }).compile();

    service = module.get<ResubscribeService>(ResubscribeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
