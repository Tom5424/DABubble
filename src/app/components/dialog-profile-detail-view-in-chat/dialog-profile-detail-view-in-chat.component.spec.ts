import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProfileDetailViewInChatComponent } from './dialog-profile-detail-view-in-chat.component';

describe('DialogProfileDetailViewInDirectMessagesComponent', () => {
  let component: DialogProfileDetailViewInChatComponent;
  let fixture: ComponentFixture<DialogProfileDetailViewInChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProfileDetailViewInChatComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogProfileDetailViewInChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
