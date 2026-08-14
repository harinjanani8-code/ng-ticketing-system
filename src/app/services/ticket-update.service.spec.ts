import { TestBed } from '@angular/core/testing';

import { TicketUpdateService } from './ticket-update.service';

describe('TicketUpdateService', () => {
  let service: TicketUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
