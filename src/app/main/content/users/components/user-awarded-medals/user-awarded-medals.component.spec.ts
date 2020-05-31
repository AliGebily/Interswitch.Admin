import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAwardedMedalsComponent } from './user-awarded-medals.component';

describe('UserAwardedMedalsComponent', () => {
  let component: UserAwardedMedalsComponent;
  let fixture: ComponentFixture<UserAwardedMedalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAwardedMedalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAwardedMedalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});