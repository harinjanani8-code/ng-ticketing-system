import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMasterListComponent } from './ticket-master-list.component';

describe('TicketMasterListComponent', () => {
  let component: TicketMasterListComponent;
  let fixture: ComponentFixture<TicketMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketMasterListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
