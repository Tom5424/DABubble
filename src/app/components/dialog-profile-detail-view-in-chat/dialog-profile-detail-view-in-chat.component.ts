import { NgStyle } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dialog-profile-detail-view-in-chat',
  standalone: true,
  imports: [MatDialogClose, NgStyle],
  templateUrl: './dialog-profile-detail-view-in-chat.component.html',
  styleUrl: './dialog-profile-detail-view-in-chat.component.scss'
})


export class DialogProfileDetailViewInChatComponent {
  authService = inject(AuthService);
  router = inject(Router);
  matDialog = inject(MatDialog);


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    
  }


  noProfileImgExist(): boolean {
    return (!this.data.dataFromSelectedUser.imgUrl) ? true : false;
  }


  userIsOnline(): boolean {
    return (this.data.dataFromSelectedUser.isOnline) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(): boolean {
    return (this.data.dataFromSelectedUser.userId == this.authService.auth.currentUser?.uid) ? true : false;
  }


  writeMesssageToUser(): void {
    this.matDialog.closeAll();
    this.router.navigate(['/mainView/directMessage/', this.data.dataFromSelectedUser.userId]);
  }
}
