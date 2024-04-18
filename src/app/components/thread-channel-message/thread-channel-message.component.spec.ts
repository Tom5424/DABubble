import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadChannelMessageComponent } from './thread-channel-message.component';

describe('ThreadChannelMessageComponent', () => {
  let component: ThreadChannelMessageComponent;
  let fixture: ComponentFixture<ThreadChannelMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadChannelMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreadChannelMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
