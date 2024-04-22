import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileDetailViewInChatComponent } from '../dialog-profile-detail-view-in-chat/dialog-profile-detail-view-in-chat.component';
import { DialogAddMorePeopleToChannelComponent } from '../dialog-add-more-people-to-channel/dialog-add-more-people-to-channel.component';
import { CreateChannelService } from '../../services/create-channel.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-dialog-channel-members',
  standalone: true,
  imports: [NgClass, MatDialogClose],
  templateUrl: './dialog-channel-members.component.html',
  styleUrl: './dialog-channel-members.component.scss'
})


export class DialogChannelMembersComponent {
  authService = inject(AuthService);
  createChannelService = inject(CreateChannelService);
  matDialog = inject(MatDialog);


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }


  openDetailViewFromSelectedChannelMember(selectedChannelMember: User): void {
    this.matDialog.open(DialogProfileDetailViewInChatComponent, { data: { dataFromSelectedUser: selectedChannelMember } });
  }


  openDialogToAddMorePeopleToChannel(): void {
    this.matDialog.closeAll();
    this.matDialog.open(DialogAddMorePeopleToChannelComponent, { position: { top: '185px', left: '560px' }, data: { channelName: this.createChannelService.channel.channelName, channelMembers: this.data.channelMembers, channelId: this.data.channelId } });
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
