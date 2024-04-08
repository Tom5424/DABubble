import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileDetailViewInChatComponent } from '../dialog-profile-detail-view-in-chat/dialog-profile-detail-view-in-chat.component';


@Component({
  selector: 'app-dialog-channel-members',
  standalone: true,
  imports: [MatDialogClose],
  templateUrl: './dialog-channel-members.component.html',
  styleUrl: './dialog-channel-members.component.scss'
})


export class DialogChannelMembersComponent {
  authService = inject(AuthService);
  matDialog = inject(MatDialog);


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }


  openDetailViewFromSelectedChannelMember(selectedChannelMember: User): void {
    this.matDialog.open(DialogProfileDetailViewInChatComponent, { data: { dataFromSelectedUser: selectedChannelMember } });
  }


  noProfileImgExist(user: User): boolean {
    return (!user.imgUrl) ? true : false;
  }


  userIsOnline(user: User): boolean {
    return (user.isOnline) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(user: User): boolean {
    return (user.userId == this.authService.user.userId) ? true : false;
  }
}
