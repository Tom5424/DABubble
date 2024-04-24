import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCreateAccountMobileViewComponent } from './button-create-account-mobile-view.component';

describe('ButtonCreateAccountMobileViewComponent', () => {
  let component: ButtonCreateAccountMobileViewComponent;
  let fixture: ComponentFixture<ButtonCreateAccountMobileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCreateAccountMobileViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonCreateAccountMobileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
