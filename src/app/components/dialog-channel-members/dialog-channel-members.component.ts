import { Component, inject } from '@angular/core';
import { MatDialogClose } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-channel-members',
  standalone: true,
  imports: [MatDialogClose],
  templateUrl: './dialog-channel-members.component.html',
  styleUrl: './dialog-channel-members.component.scss'
})


export class DialogChannelMembersComponent {
  
}
