import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAccountDeletedComponent } from './dialog-account-deleted.component';

describe('DialogAccountDeletedComponent', () => {
  let component: DialogAccountDeletedComponent;
  let fixture: ComponentFixture<DialogAccountDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAccountDeletedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAccountDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
