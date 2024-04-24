import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AvatarPickerComponent } from '../avatar-picker/avatar-picker.component';
import { HeaderComponent } from '../header/header.component';
import { RoutingService } from '../../services/routing.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, AvatarPickerComponent, RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', './signup.component.media.scss'],
})


export class SignupComponent implements OnInit {
  router = inject(Router);
  routingService = inject(RoutingService);
  authService = inject(AuthService);
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(50)]),
    checkboxPrivacyPolicy: new FormControl(false, Validators.required),
  });


  ngOnInit(): void {
    this.routingService.savePreviousUrl(this.router.routerState.snapshot.url);
    if (this.router.url !== '/avatarPicker') {
      this.authService.removeDataFromLocaleStorageService();
    }
  }


  saveFormDataAndDirectToNextPage(): void {
    this.authService.saveFormDataSignupFormService(this.signupForm.value);
    this.signupForm.reset();
    this.router.navigateByUrl('/avatarPicker');
  }


  inputfieldNameIsRequired(): boolean {
    return (this.signupForm.controls.name.touched && this.signupForm.controls.name.errors?.['required']) ? true : false;
  }


  inputfieldNameIsToShort(): boolean {
    return (this.signupForm.controls.name.errors?.['minlength']) ? true : false;
  }


  inputfieldNameIsToLong(): boolean {
    return (this.signupForm.controls.name.errors?.['maxlength']) ? true : false;
  }


  inputfieldEmailIsRequired(): boolean {
    return (this.signupForm.controls.email.touched && this.signupForm.controls.email.errors?.['required']) ? true : false;
  }


  inputfieldEmailIsInvalid(): boolean {
    return (this.signupForm.controls.email.errors?.['pattern']) ? true : false;
  }


  inputfieldPasswordIsRequired(): boolean {
    return (this.signupForm.controls.password.touched && this.signupForm.controls.password.errors?.['required']) ? true : false;
  }


  inputfieldPasswordIsToShort(): boolean {
    return (this.signupForm.controls.password.errors?.['minlength']) ? true : false;
  }


  inputfieldPasswordIsToLong(): boolean {
    return (this.signupForm.controls.password.errors?.['maxlength']) ? true : false;
  }
}
