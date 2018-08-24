import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeToGameComponent } from './subscribe-to-game.component';

describe('SubscribeToGameComponent', () => {
  let component: SubscribeToGameComponent;
  let fixture: ComponentFixture<SubscribeToGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeToGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeToGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
