import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCreateNewMessageMobileViewComponent } from './button-create-new-message-mobile-view.component';

describe('ButtonCreateNewMessageMobileViewComponent', () => {
  let component: ButtonCreateNewMessageMobileViewComponent;
  let fixture: ComponentFixture<ButtonCreateNewMessageMobileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCreateNewMessageMobileViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonCreateNewMessageMobileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
