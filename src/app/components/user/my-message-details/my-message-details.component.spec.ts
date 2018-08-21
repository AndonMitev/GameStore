import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMessageDetailsComponent } from './my-message-details.component';

describe('MyMessageDetailsComponent', () => {
  let component: MyMessageDetailsComponent;
  let fixture: ComponentFixture<MyMessageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMessageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMessageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
