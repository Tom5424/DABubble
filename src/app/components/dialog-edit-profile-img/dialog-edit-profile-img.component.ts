import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RoutingService } from '../../services/routing.service';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { CreateUserService } from '../../services/create-user.service';
import { StorageInDialogEditProfileImgService } from '../../services/storage-in-dialog-edit-profile-img.service';


@Component({
  selector: 'app-dialog-edit-profile-img',
  standalone: true,
  imports: [NgClass, MatTooltipModule, MatDialogClose],
  templateUrl: './dialog-edit-profile-img.component.html',
  styleUrl: './dialog-edit-profile-img.component.scss'
})


export class DialogEditProfileImgComponent {
  storageInDialogEditProfileImgService = inject(StorageInDialogEditProfileImgService);
  authService = inject(AuthService);
  createUserService = inject(CreateUserService);
  routingService = inject(RoutingService);
  router = inject(Router);
  matDialog = inject(MatDialog);
  tooltipText: string = 'Note: The following Data can be only uploaded: jpg and png. In addition you can only upload Data up to maximum 300 kb.';


  noAvatarIsSelected(): boolean {
    return this.storageInDialogEditProfileImgService.selectedImageAvatarUrl == '' && this.authService.user.imgUrl == null && !this.storageInDialogEditProfileImgService.imgIsUploaded && !this.storageInDialogEditProfileImgService.uploadImg;
  }


  avatarIsSelected(): boolean {
    return this.storageInDialogEditProfileImgService.selectedImageAvatarUrl !== '' && !this.storageInDialogEditProfileImgService.imgIsUploaded && !this.storageInDialogEditProfileImgService.uploadImg;
  }


  imageUploadingIsInProgress(): boolean {
    return this.storageInDialogEditProfileImgService.uploadImg && !this.storageInDialogEditProfileImgService.imgIsUploaded;
  }


  imageIsUploaded(): boolean {
    return this.storageInDialogEditProfileImgService.urlFromUploadedImg !== '' && this.storageInDialogEditProfileImgService.imgIsUploaded;
  }


  selectAvatar(selectedImageAvatarUrl: string): void {
    if (this.storageInDialogEditProfileImgService.selectedImageAvatarUrl !== selectedImageAvatarUrl) {
      this.storageInDialogEditProfileImgService.selectedImageAvatarUrl = selectedImageAvatarUrl;
      this.storageInDialogEditProfileImgService.imgIsUploaded = false;
    } else {
      this.storageInDialogEditProfileImgService.selectedImageAvatarUrl = '';
    }
  }


  selectFile(selectedFile: HTMLInputElement): void {
    this.storageInDialogEditProfileImgService.selectFileService(selectedFile);
  }


  saveNewSelectedAvatar(): void {
    this.authService.updateUserImgService(this.authService.auth.currentUser, this.storageInDialogEditProfileImgService.selectedImageAvatarUrl, this.storageInDialogEditProfileImgService.urlFromUploadedImg);
    this.matDialog.closeAll();
    this.storageInDialogEditProfileImgService.selectedImageAvatarUrl = '';
    this.storageInDialogEditProfileImgService.urlFromUploadedImg = '';
  }
}
