import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-avatar-picker',
  standalone: true,
  imports: [FooterComponent, RouterLink, NgClass],
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


  constructor(public formDataService: FormDataService) {

  }



  ngOnInit(): void {
    this.formDataService.loadFormDataSignupForm();
  }


  selectOrToggleAvatar(selectedImageAvatarUrl: string): void {
    if (this.selectedImageAvatarUrl !== selectedImageAvatarUrl) {
      this.selectedImageAvatarUrl = selectedImageAvatarUrl;
    } else {
      this.selectedImageAvatarUrl = '';
    }
  }


  test() {

  }
}
