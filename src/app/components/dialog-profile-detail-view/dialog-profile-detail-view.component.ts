import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { DialogEditProfileComponent } from '../dialog-edit-profile/dialog-edit-profile.component';


@Component({
  selector: 'app-dialog-profile-detail-view',
  standalone: true,
  imports: [MatDialogClose],
  templateUrl: './dialog-profile-detail-view.component.html',
  styleUrl: './dialog-profile-detail-view.component.scss'
})


export class DialogProfileDetailViewComponent implements OnInit {
  authService = inject(AuthService);
  matDialog = inject(MatDialog);


  ngOnInit(): void {
    this.authService.getDataFromLoggedInUserService();
    // this.authService.loadUserOnlineStatusService();
  }


  openProfileEditView(): void {
    this.matDialog.open(DialogEditProfileComponent, { position: { top: '95px', right: '25px' }, autoFocus: false });
  }


  guestUserIsNotLoggedIn(): boolean {
    return !this.authService.auth.currentUser?.isAnonymous;
  }


  userWithGoogleIsNotLoggedIn(): boolean {
    return this.authService.auth.currentUser?.providerData[0] !== undefined && this.authService.auth.currentUser?.providerData[0].providerId !== 'google.com';
  }
}