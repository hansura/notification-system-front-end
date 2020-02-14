import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateroleComponent } from './updaterole.component';

describe('UpdateroleComponent', () => {
  let component: UpdateroleComponent;
  let fixture: ComponentFixture<UpdateroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
