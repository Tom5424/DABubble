import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProfileDetailViewComponent } from './dialog-profile-detail-view.component';

describe('DialogProfileDetailViewComponent', () => {
  let component: DialogProfileDetailViewComponent;
  let fixture: ComponentFixture<DialogProfileDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProfileDetailViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogProfileDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
