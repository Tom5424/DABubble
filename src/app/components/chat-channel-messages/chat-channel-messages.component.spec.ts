import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChannelMessagesComponent } from './chat-channel-messages.component';

describe('ChatChannelMessagesComponent', () => {
  let component: ChatChannelMessagesComponent;
  let fixture: ComponentFixture<ChatChannelMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatChannelMessagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatChannelMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
