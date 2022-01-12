import { TestBed } from '@angular/core/testing';

import { OpinionesservicesService } from './opinionesservices.service';

describe('OpinionesservicesService', () => {
  let service: OpinionesservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpinionesservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
