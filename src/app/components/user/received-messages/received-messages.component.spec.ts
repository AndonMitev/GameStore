import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedMessagesComponent } from './received-messages.component';

describe('RecievedMessagesComponent', () => {
  let component: RecievedMessagesComponent;
  let fixture: ComponentFixture<RecievedMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievedMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievedMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
