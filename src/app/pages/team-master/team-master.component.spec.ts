import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMasterComponent } from './team-master.component';

describe('TeamMasterComponent', () => {
  let component: TeamMasterComponent;
  let fixture: ComponentFixture<TeamMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
