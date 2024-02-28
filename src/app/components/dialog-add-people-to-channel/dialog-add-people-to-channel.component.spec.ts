import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPeopleToChannelComponent } from './dialog-add-people-to-channel.component';

describe('DialogAddPeopleToChannelComponent', () => {
  let component: DialogAddPeopleToChannelComponent;
  let fixture: ComponentFixture<DialogAddPeopleToChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddPeopleToChannelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddPeopleToChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
