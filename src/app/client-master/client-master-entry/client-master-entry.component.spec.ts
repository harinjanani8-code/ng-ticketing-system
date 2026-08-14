import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMasterEntryComponent } from './client-master-entry.component';

describe('ClientMasterEntryComponent', () => {
  let component: ClientMasterEntryComponent;
  let fixture: ComponentFixture<ClientMasterEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientMasterEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientMasterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
