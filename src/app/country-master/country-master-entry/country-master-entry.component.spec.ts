import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryMasterEntryComponent } from './country-master-entry.component';

describe('CountryMasterEntryComponent', () => {
  let component: CountryMasterEntryComponent;
  let fixture: ComponentFixture<CountryMasterEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryMasterEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryMasterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
