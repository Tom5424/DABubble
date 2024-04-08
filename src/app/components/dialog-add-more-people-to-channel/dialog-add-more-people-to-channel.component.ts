import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-more-people-to-channel',
  standalone: true,
  imports: [MatDialogClose],
  templateUrl: './dialog-add-more-people-to-channel.component.html',
  styleUrl: './dialog-add-more-people-to-channel.component.scss'
})


export class DialogAddMorePeopleToChannelComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    
  }

}
