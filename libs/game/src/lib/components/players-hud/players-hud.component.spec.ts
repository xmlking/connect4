import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersHudComponent } from './players-hud.component';

describe('PlayersHudComponent', () => {
  let component: PlayersHudComponent;
  let fixture: ComponentFixture<PlayersHudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersHudComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersHudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
