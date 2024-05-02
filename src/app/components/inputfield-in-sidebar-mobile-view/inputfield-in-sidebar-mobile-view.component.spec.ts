import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputfieldInSidebarMobileViewComponent } from './inputfield-in-sidebar-mobile-view.component';

describe('InputfieldInSidebarMobileViewComponent', () => {
  let component: InputfieldInSidebarMobileViewComponent;
  let fixture: ComponentFixture<InputfieldInSidebarMobileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputfieldInSidebarMobileViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputfieldInSidebarMobileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
