import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCommentsGameComponent } from './all-comments-game.component';

describe('AllCommentsGameComponent', () => {
  let component: AllCommentsGameComponent;
  let fixture: ComponentFixture<AllCommentsGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCommentsGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCommentsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
