import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';

describe('MatchService', () => {
  let service: MatchService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchService],
    }).compile();
    service = module.get<MatchService>(MatchService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
