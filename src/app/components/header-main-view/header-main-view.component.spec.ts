import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMainViewComponent } from './header-main-view.component';

describe('HeaderMainViewComponent', () => {
  let component: HeaderMainViewComponent;
  let fixture: ComponentFixture<HeaderMainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMainViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
