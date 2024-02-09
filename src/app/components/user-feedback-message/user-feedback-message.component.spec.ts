import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeedbackMessageComponent } from './user-feedback-message.component';

describe('UserFeedbackMessageComponent', () => {
  let component: UserFeedbackMessageComponent;
  let fixture: ComponentFixture<UserFeedbackMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFeedbackMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFeedbackMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
