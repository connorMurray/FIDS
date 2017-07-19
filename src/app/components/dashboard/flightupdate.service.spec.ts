import { TestBed, inject } from '@angular/core/testing';

import { FlightupdateService } from './flightupdate.service';

describe('FlightupdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightupdateService]
    });
  });

  // it('should be created', inject([FlightupdateService], (service: FlightupdateService) => {
  //   expect(service).toBeTruthy();
  // }));
});
