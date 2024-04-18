import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReauthenticateUserComponent } from './dialog-reauthenticate-user.component';

describe('DialogReauthenticateUserComponent', () => {
  let component: DialogReauthenticateUserComponent;
  let fixture: ComponentFixture<DialogReauthenticateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogReauthenticateUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogReauthenticateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
