import { async, TestBed } from '@angular/core/testing';
import { GameModule } from './game.module';

describe('GameModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GameModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(GameModule).toBeDefined();
  });
});
