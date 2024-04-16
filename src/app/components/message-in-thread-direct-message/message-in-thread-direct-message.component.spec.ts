import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageInThreadDirectMessageComponent } from './message-in-thread-direct-message.component';

describe('MessageInThreadDirectMessageComponent', () => {
  let component: MessageInThreadDirectMessageComponent;
  let fixture: ComponentFixture<MessageInThreadDirectMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageInThreadDirectMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageInThreadDirectMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
