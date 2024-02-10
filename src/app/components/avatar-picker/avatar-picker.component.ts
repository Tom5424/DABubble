import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
import { NgClass } from '@angular/common';
import { UserFeedbackMessageComponent } from '../user-feedback-message/user-feedback-message.component';
import { HeaderComponent } from '../header/header.component';
import { RoutingService } from '../../services/routing.service';


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


  constructor(public formDataService: FormDataService, public routingService: RoutingService, public router: Router) {

  }


  ngOnInit(): void {
    this.formDataService.loadFormDataSignupForm();
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
    this.formDataService.accountIsCreated = true;
    setTimeout(() => {
      this.router.navigateByUrl('/login');
      localStorage.removeItem('userData');
      this.formDataService.accountIsCreated = false;
    }, 1200);
  }
}
