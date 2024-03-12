import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsInSidebarComponent } from './contacts-in-sidebar.component';

describe('ContactsInSidebarComponent', () => {
  let component: ContactsInSidebarComponent;
  let fixture: ComponentFixture<ContactsInSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsInSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactsInSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
