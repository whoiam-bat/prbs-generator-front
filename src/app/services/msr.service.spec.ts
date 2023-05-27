import { TestBed } from '@angular/core/testing';

import { MsrService } from './msr.service';

describe('MsrService', () => {
  let service: MsrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
