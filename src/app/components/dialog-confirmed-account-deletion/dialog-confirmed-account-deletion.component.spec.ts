import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmedAccountDeletionComponent } from './dialog-confirmed-account-deletion.component';

describe('DialogConfirmedAccountDeletionComponent', () => {
  let component: DialogConfirmedAccountDeletionComponent;
  let fixture: ComponentFixture<DialogConfirmedAccountDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogConfirmedAccountDeletionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogConfirmedAccountDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
