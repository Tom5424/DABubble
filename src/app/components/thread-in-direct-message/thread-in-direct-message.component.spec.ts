import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadInDirectMessageComponent } from './thread-in-direct-message.component';

describe('ThreadComponent', () => {
  let component: ThreadInDirectMessageComponent;
  let fixture: ComponentFixture<ThreadInDirectMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadInDirectMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreadInDirectMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
