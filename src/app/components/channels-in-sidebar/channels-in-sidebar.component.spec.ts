import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsInSidebarComponent } from './channels-in-sidebar.component';

describe('ChannelsInSidebarComponent', () => {
  let component: ChannelsInSidebarComponent;
  let fixture: ComponentFixture<ChannelsInSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelsInSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChannelsInSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
