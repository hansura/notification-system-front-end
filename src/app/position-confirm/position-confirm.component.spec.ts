import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionConfirmComponent } from './position-confirm.component';

describe('PositionConfirmComponent', () => {
  let component: PositionConfirmComponent;
  let fixture: ComponentFixture<PositionConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
