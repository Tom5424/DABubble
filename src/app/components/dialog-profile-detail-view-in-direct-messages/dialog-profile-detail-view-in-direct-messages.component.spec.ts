import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProfileDetailViewInDirectMessagesComponent } from './dialog-profile-detail-view-in-direct-messages.component';

describe('DialogProfileDetailViewInDirectMessagesComponent', () => {
  let component: DialogProfileDetailViewInDirectMessagesComponent;
  let fixture: ComponentFixture<DialogProfileDetailViewInDirectMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProfileDetailViewInDirectMessagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogProfileDetailViewInDirectMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
