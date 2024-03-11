import { NgStyle } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dialog-profile-detail-view-in-direct-messages',
  standalone: true,
  imports: [MatDialogClose, NgStyle],
  templateUrl: './dialog-profile-detail-view-in-chat.component.html',
  styleUrl: './dialog-profile-detail-view-in-chat.component.scss'
})


export class DialogProfileDetailViewInChatComponent {
  authService = inject(AuthService);
  router = inject(Router);
  matDialog = inject(MatDialog);


  constructor(@Inject(MAT_DIALOG_DATA) public data: { userData: any }) {

  }


  noProfileImgExist(): boolean {
    return (!this.data.userData.imgUrl) ? true : false;
  }


  userIsOnline(): boolean {
    return (this.data.userData.isOnline) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(): boolean {
    return (this.data.userData.userId == this.authService.auth.currentUser?.uid) ? true : false;
  }


  writeMesssage(): void {
    this.matDialog.closeAll();
    this.router.navigate(['/mainView/user/', this.data.userData.userId]);
  }
}
