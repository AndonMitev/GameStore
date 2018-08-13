import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommentGameComponent } from './create-comment-game.component';

describe('CreateCommentGameComponent', () => {
  let component: CreateCommentGameComponent;
  let fixture: ComponentFixture<CreateCommentGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCommentGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommentGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
