import { TestBed } from '@angular/core/testing';

import { DriverProfileService } from './driver-profile.service';

describe('DriverProfileService', () => {
  let service: DriverProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
