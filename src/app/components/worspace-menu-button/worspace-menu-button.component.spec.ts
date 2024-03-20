import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorspaceMenuButtonComponent } from './worspace-menu-button.component';

describe('WorspaceMenuButtonComponent', () => {
  let component: WorspaceMenuButtonComponent;
  let fixture: ComponentFixture<WorspaceMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorspaceMenuButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorspaceMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
