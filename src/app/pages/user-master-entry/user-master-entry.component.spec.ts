import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMasterEntryComponent } from './user-master-entry.component';

describe('UserMasterEntryComponent', () => {
  let component: UserMasterEntryComponent;
  let fixture: ComponentFixture<UserMasterEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMasterEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserMasterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
