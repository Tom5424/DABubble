import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { DialogEditProfileComponent } from '../dialog-edit-profile/dialog-edit-profile.component';
import { NgStyle } from '@angular/common';
import { CreateUserService } from '../../services/create-user.service';


@Component({
  selector: 'app-dialog-profile-detail-view',
  standalone: true,
  imports: [MatDialogClose, NgStyle],
  templateUrl: './dialog-profile-detail-view.component.html',
  styleUrl: './dialog-profile-detail-view.component.scss'
})


export class DialogProfileDetailViewComponent implements OnInit {
  authService = inject(AuthService);
  createUserService = inject(CreateUserService);
  matDialog = inject(MatDialog);


  ngOnInit(): void {
    this.authService.getDataFromLoggedInUserService();
    this.authService.loadUserOnlineStatusService();
  }


  openProfileEditView(): void {
    this.matDialog.open(DialogEditProfileComponent, { position: { top: '95px', right: '25px' }, autoFocus: false });
  }


  changeOnlineStatus() {
    this.authService.user.isOnline = !this.authService.user.isOnline;
    this.authService.saveUserOnlineStatusService();
    this.createUserService.updateUserOnlineStatusService(this.authService.auth.currentUser?.uid, this.authService.user.isOnline);
  }
}
