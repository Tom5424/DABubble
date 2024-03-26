import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-uploaded-img-full-view',
  standalone: true,
  imports: [MatDialogClose],
  templateUrl: './dialog-uploaded-img-full-view.component.html',
  styleUrl: './dialog-uploaded-img-full-view.component.scss'
})


export class DialogUploadedImgFullViewComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: { uploadedImage: string }) {

  }

}
