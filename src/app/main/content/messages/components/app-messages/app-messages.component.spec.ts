import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMessagesComponent } from './app-messages.component';

describe('AppMessagesComponent', () => {
  let component: AppMessagesComponent;
  let fixture: ComponentFixture<AppMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
