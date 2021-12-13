import { TestBed } from '@angular/core/testing';

import { CentService } from './cent.service';

describe('CentService', () => {
  let service: CentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
