import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchConfirmComponent } from './branch-confirm.component';

describe('BranchConfirmComponent', () => {
  let component: BranchConfirmComponent;
  let fixture: ComponentFixture<BranchConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
