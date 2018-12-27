import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';

describe('Match Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [MatchController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: MatchController = module.get<MatchController>(MatchController);
    expect(controller).toBeDefined();
  });
});
