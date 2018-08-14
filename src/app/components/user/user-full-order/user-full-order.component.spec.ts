import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFullOrderComponent } from './user-full-order.component';

describe('UserFullOrderComponent', () => {
  let component: UserFullOrderComponent;
  let fixture: ComponentFixture<UserFullOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFullOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFullOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
