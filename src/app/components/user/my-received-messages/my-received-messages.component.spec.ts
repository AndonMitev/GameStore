import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecievedMessagesComponent } from './my-received-messages.component';

describe('MyRecievedMessagesComponent', () => {
  let component: MyRecievedMessagesComponent;
  let fixture: ComponentFixture<MyRecievedMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRecievedMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRecievedMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
