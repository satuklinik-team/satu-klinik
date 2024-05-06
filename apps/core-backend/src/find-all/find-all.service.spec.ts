import { Test, TestingModule } from '@nestjs/testing';
import { FindAllService } from './find-all.service';

describe('FindAllService', () => {
  let service: FindAllService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllService],
    }).compile();

    service = module.get<FindAllService>(FindAllService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
