import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleConfirmComponent } from './role-confirm.component';

describe('RoleConfirmComponent', () => {
  let component: RoleConfirmComponent;
  let fixture: ComponentFixture<RoleConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
