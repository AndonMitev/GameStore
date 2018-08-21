import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySentMessages } from './my-sent-messages.component';

describe('MySentMessages', () => {
  let component: MySentMessages;
  let fixture: ComponentFixture<MySentMessages>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MySentMessages]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySentMessages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
