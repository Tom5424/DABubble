import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { DialogEditProfileComponent } from '../dialog-edit-profile/dialog-edit-profile.component';
import { NgClass, NgStyle } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-dialog-profile-detail-view',
  standalone: true,
  imports: [MatDialogClose, MatTooltipModule, NgClass, NgStyle],
  templateUrl: './dialog-profile-detail-view.component.html',
  styleUrl: './dialog-profile-detail-view.component.scss'
})


export class DialogProfileDetailViewComponent implements OnInit {
  authService = inject(AuthService);
  matDialog = inject(MatDialog);
  tooltipTextForEditUserBtn: string = 'Guest Users cannot be edited. If you would like to edit your Profile, please log in with your created Account or with your Google Account.';
  tooltipTextForDeleteUserBtn: string = 'Guest User can not deleted, because they will delete automatically.';


  ngOnInit(): void {
    this.authService.getDataFromLoggedInUserService();
  }


  openProfileEditView(): void {
    this.matDialog.open(DialogEditProfileComponent, { position: { top: '95px', right: '25px' } });
  }


  guestUserIsLoggedIn(): boolean {
    return (this.authService.auth.currentUser?.isAnonymous) ? true : false;
  }


  noProfileImgExist(): boolean {
    return (!this.authService.user.imgUrl) ? true : false;
  }
}