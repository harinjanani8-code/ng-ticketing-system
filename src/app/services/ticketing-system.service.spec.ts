import { TestBed } from '@angular/core/testing';

import { TicketingSystemService } from './ticketing-system.service';

describe('TicketingSystemService', () => {
  let service: TicketingSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketingSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
