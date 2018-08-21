import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCreateMessageComponent } from './my-create-message.component';

describe('MyCreateMessageComponent', () => {
  let component: MyCreateMessageComponent;
  let fixture: ComponentFixture<MyCreateMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCreateMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCreateMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
