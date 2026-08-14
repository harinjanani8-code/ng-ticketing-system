import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMasterEntryComponent } from './ticket-master-entry.component';

describe('TicketMasterEntryComponent', () => {
  let component: TicketMasterEntryComponent;
  let fixture: ComponentFixture<TicketMasterEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketMasterEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketMasterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
