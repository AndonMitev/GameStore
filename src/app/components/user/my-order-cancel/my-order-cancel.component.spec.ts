import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrderCancelComponent } from './my-order-cancel.component';

describe('MyOrderCancelComponent', () => {
  let component: MyOrderCancelComponent;
  let fixture: ComponentFixture<MyOrderCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOrderCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrderCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
