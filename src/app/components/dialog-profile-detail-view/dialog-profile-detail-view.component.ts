import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { DialogEditProfileComponent } from '../dialog-edit-profile/dialog-edit-profile.component';
import { NgClass, NgStyle } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogEditProfileImgComponent } from '../dialog-edit-profile-img/dialog-edit-profile-img.component';
import { StorageInDialogEditProfileImgService } from '../../services/storage-in-dialog-edit-profile-img.service';


@Component({
  selector: 'app-dialog-profile-detail-view',
  standalone: true,
  imports: [MatDialogClose, MatTooltipModule, NgClass, NgStyle],
  templateUrl: './dialog-profile-detail-view.component.html',
  styleUrls: ['./dialog-profile-detail-view.component.scss', './dialog-profile-detail-view.component.media.scss'],
})


export class DialogProfileDetailViewComponent implements OnInit {
  storageInDialogEditProfileImgService = inject(StorageInDialogEditProfileImgService);
  authService = inject(AuthService);
  matDialog = inject(MatDialog);
  tooltipTextForEditUserBtn: string = 'Guest Users cannot be edited. If you would like to edit your Profile, please log in with your created Account or with your Google Account.';
  tooltipTextForEditUserImg: string = 'Image from Guest Users cannot be edited. If you would like to edit your Profile Image, please log in with your created Account or with your Google Account.';


  ngOnInit(): void {
    this.authService.getDataFromLoggedInUserService();
  }


  openDialogEditProfileImg(): void {
    let dialogRef = this.matDialog.open(DialogEditProfileImgComponent, { position: { top: '95px', right: '25px' } });
    dialogRef.afterClosed().subscribe(() => {
      this.storageInDialogEditProfileImgService.selectedImageAvatarUrl = '';
      this.storageInDialogEditProfileImgService.urlFromUploadedImg = '';
    });
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