import { Component, OnInit, inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { UserFeedbackMessageComponent } from '../user-feedback-message/user-feedback-message.component';
import { HeaderComponent } from '../header/header.component';
import { RoutingService } from '../../services/routing.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogUploadInvalidDataComponent } from '../dialog-upload-invalid-data/dialog-upload-invalid-data.component';


@Component({
  selector: 'app-avatar-picker',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, UserFeedbackMessageComponent, DialogUploadInvalidDataComponent, RouterLink, NgClass, MatTooltipModule],
  templateUrl: './avatar-picker.component.html',
  styleUrl: './avatar-picker.component.scss'
})


export class AvatarPickerComponent implements OnInit {
  authService = inject(AuthService);
  storageService = inject(StorageService);
  routingService = inject(RoutingService);
  router = inject(Router);
  tooltipText: string = 'Note: The following Data can be only uploaded: jpg and png. In addition you can only upload Data up to maximum 300 kb.';


  ngOnInit(): void {
    this.authService.loadFormDataSignupFormService();
    this.routingService.savePreviousUrl(this.router.routerState.snapshot.url);
  }


  noAvatarIsSelected(): boolean {
    return this.storageService.selectedImageAvatarUrl == '' && !this.storageService.imgIsUploaded && !this.storageService.uploadImg;
  }


  avatarIsSelected(): boolean {
    return this.storageService.selectedImageAvatarUrl !== '' && !this.storageService.imgIsUploaded && !this.storageService.uploadImg;
  }


  imageUploadingIsInProgress(): boolean {
    return this.storageService.uploadImg && !this.storageService.imgIsUploaded;
  }


  imageIsUploaded(): boolean {
    return this.storageService.urlFromUploadedImg !== '' && this.storageService.imgIsUploaded;
  }


  selectAvatar(selectedImageAvatarUrl: string): void {
    if (this.storageService.selectedImageAvatarUrl !== selectedImageAvatarUrl) {
      this.storageService.selectedImageAvatarUrl = selectedImageAvatarUrl;
      this.storageService.imgIsUploaded = false;
    } else {
      this.storageService.selectedImageAvatarUrl = '';
    }
  }


  selectFile(selectedFile: HTMLInputElement): void {
    this.storageService.selectFileService(selectedFile);
  }


  createAccount(): void {
    this.authService.saveUserImgUrl(this.storageService.selectedImageAvatarUrl, this.storageService.urlFromUploadedImg);
    this.authService.signupService(this.authService.user.email, this.authService.user.password);
    this.storageService.urlFromUploadedImg = '';
  }
}
