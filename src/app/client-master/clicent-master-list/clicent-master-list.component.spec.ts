import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClicentMasterListComponent } from './clicent-master-list.component';

describe('ClicentMasterListComponent', () => {
  let component: ClicentMasterListComponent;
  let fixture: ComponentFixture<ClicentMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClicentMasterListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClicentMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
