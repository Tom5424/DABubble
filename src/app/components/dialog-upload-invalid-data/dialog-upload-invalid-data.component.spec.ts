import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadInvalidDataComponent } from './dialog-upload-invalid-data.component';

describe('DialogUploadInvalidDataComponent', () => {
  let component: DialogUploadInvalidDataComponent;
  let fixture: ComponentFixture<DialogUploadInvalidDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUploadInvalidDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogUploadInvalidDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
