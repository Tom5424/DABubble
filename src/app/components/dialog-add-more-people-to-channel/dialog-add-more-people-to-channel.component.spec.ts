import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMorePeopleToChannelComponent } from './dialog-add-more-people-to-channel.component';

describe('DialogAddMorePeopleToChannelComponent', () => {
  let component: DialogAddMorePeopleToChannelComponent;
  let fixture: ComponentFixture<DialogAddMorePeopleToChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddMorePeopleToChannelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddMorePeopleToChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
