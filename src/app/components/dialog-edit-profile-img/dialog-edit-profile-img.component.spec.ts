import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditProfileImgComponent } from './dialog-edit-profile-img.component';

describe('DialogEditProfileImgComponent', () => {
  let component: DialogEditProfileImgComponent;
  let fixture: ComponentFixture<DialogEditProfileImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditProfileImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditProfileImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
