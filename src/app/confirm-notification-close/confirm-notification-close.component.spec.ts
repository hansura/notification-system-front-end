import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmNotificationCloseComponent } from './confirm-notification-close.component';

describe('ConfirmNotificationCloseComponent', () => {
  let component: ConfirmNotificationCloseComponent;
  let fixture: ComponentFixture<ConfirmNotificationCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmNotificationCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmNotificationCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
