import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { UserFeedbackMessageComponent } from '../user-feedback-message/user-feedback-message.component';
import { HeaderComponent } from '../header/header.component';
import { RoutingService } from '../../services/routing.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-avatar-picker',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, UserFeedbackMessageComponent, RouterLink, NgClass],
  templateUrl: './avatar-picker.component.html',
  styleUrl: './avatar-picker.component.scss'
})


export class AvatarPickerComponent implements OnInit {
  avatarImageUrls: string[] = [
    './assets/img/avatar-1.svg',
    './assets/img/avatar-2.svg',
    './assets/img/avatar-3.svg',
    './assets/img/avatar-4.svg',
    './assets/img/avatar-5.svg',
    './assets/img/avatar-6.svg',
  ];
  selectedImageAvatarUrl: string = '';


  constructor(public routingService: RoutingService, public router: Router, public authService: AuthService) {

  }


  ngOnInit(): void {
    this.authService.loadFormDataSignupFormService();
    this.routingService.savePreviousUrl(this.router.routerState.snapshot.url);
  }


  selectAvatar(selectedImageAvatarUrl: string): void {
    if (this.selectedImageAvatarUrl !== selectedImageAvatarUrl) {
      this.selectedImageAvatarUrl = selectedImageAvatarUrl;
    } else {
      this.selectedImageAvatarUrl = '';
    }
  }


  createAccount(): void {
    this.authService.signupService(this.authService.user.email, this.authService.user.password);
  }
}
