import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-uploaded-img-full-view',
  standalone: true,
  imports: [MatDialogClose],
  templateUrl: './dialog-uploaded-img-full-view.component.html',
  styleUrls: ['./dialog-uploaded-img-full-view.component.scss', './dialog-uploaded-img-full-view.component.media.scss']
})


export class DialogUploadedImgFullViewComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: { uploadedImage: string }) {

  }

}
