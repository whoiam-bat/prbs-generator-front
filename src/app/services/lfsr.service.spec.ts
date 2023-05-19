import { TestBed } from '@angular/core/testing';

import { LfsrService } from './lfsr.service';

describe('LfsrServiceService', () => {
  let service: LfsrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LfsrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
