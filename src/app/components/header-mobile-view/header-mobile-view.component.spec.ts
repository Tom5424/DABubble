import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMobileViewComponent } from './header-mobile-view.component';

describe('HeaderMobileViewComponent', () => {
  let component: HeaderMobileViewComponent;
  let fixture: ComponentFixture<HeaderMobileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMobileViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderMobileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
