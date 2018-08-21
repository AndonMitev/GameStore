import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFullOrderDetails } from './my-full-order-details.component';

describe('MyFullOrderDetails', () => {
  let component: MyFullOrderDetails;
  let fixture: ComponentFixture<MyFullOrderDetails>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFullOrderDetails ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFullOrderDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
