import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadedImgFullViewComponent } from './dialog-uploaded-img-full-view.component';

describe('DialogUploadedImgFullViewComponent', () => {
  let component: DialogUploadedImgFullViewComponent;
  let fixture: ComponentFixture<DialogUploadedImgFullViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUploadedImgFullViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogUploadedImgFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
