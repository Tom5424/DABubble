import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeToDabubbleComponent } from './welcome-to-dabubble.component';

describe('WelcomeToDabubbleComponent', () => {
  let component: WelcomeToDabubbleComponent;
  let fixture: ComponentFixture<WelcomeToDabubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeToDabubbleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelcomeToDabubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
