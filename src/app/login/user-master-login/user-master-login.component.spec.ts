import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMasterLoginComponent } from './user-master-login.component';

describe('UserMasterLoginComponent', () => {
  let component: UserMasterLoginComponent;
  let fixture: ComponentFixture<UserMasterLoginComponent>;
  
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMasterLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserMasterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
