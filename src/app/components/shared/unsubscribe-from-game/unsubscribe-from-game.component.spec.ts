import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeFromGameComponent } from './unsubscribe-from-game.component';

describe('UnsubscribeFromGameComponent', () => {
  let component: UnsubscribeFromGameComponent;
  let fixture: ComponentFixture<UnsubscribeFromGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsubscribeFromGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubscribeFromGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
