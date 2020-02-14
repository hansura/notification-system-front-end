import { TestBed } from '@angular/core/testing';

import { RouterGurdService } from './router-gurd.service';

describe('RouterGurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouterGurdService = TestBed.get(RouterGurdService);
    expect(service).toBeTruthy();
  });
});
