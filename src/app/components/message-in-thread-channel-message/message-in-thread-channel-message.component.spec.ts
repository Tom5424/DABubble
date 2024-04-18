import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInThreadChannelMessageComponent } from './message-in-thread-channel-message.component';

describe('MessageInThreadChannelMessageComponent', () => {
  let component: MessageInThreadChannelMessageComponent;
  let fixture: ComponentFixture<MessageInThreadChannelMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageInThreadChannelMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageInThreadChannelMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
