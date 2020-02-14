import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepositionComponent } from './updateposition.component';

describe('UpdatepositionComponent', () => {
  let component: UpdatepositionComponent;
  let fixture: ComponentFixture<UpdatepositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
