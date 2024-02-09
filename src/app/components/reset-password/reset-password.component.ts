import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { UserFeedbackMessageComponent } from '../user-feedback-message/user-feedback-message.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, UserFeedbackMessageComponent, ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})


export class ResetPasswordComponent {
  resetPasswordForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(50)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(50)]),
  });


  constructor(public formDataService: FormDataService, public router: Router) {

  }


  resetPassword(): void {
    this.formDataService.passwordReseted = true;
    this.resetPasswordForm.reset();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
      this.formDataService.passwordReseted = false;
    }, 1200);
  }


  inputfieldNewPasswordIsRequired(): boolean {
    return (this.resetPasswordForm.controls.newPassword.touched && this.resetPasswordForm.controls.newPassword.errors?.['required']) ? true : false;
  }


  inputfieldNewPasswordIsToShort(): boolean {
    return (this.resetPasswordForm.controls.newPassword.errors?.['minlength']) ? true : false;
  }


  inputfieldNewPasswordIsToLong(): boolean {
    return (this.resetPasswordForm.controls.newPassword.errors?.['maxlength']) ? true : false;
  }


  inputfieldConfirmPasswordIsRequired(): boolean {
    return (this.resetPasswordForm.controls.confirmPassword.touched && this.resetPasswordForm.controls.confirmPassword.errors?.['required']) ? true : false;
  }


  inputfieldConfirmPasswordIsToShort(): boolean {
    return (this.resetPasswordForm.controls.confirmPassword.errors?.['minlength']) ? true : false;
  }


  inputfieldConfirmPasswordIsToLong(): boolean {
    return (this.resetPasswordForm.controls.confirmPassword.errors?.['maxlength']) ? true : false;
  }


  checkIfNewPasswordMatchesWithConfirmPassword(): boolean {
    if (this.resetPasswordForm.controls.newPassword.value !== this.resetPasswordForm.controls.confirmPassword.value) {
      return true;
    } else {
      return false;
    }
  }
}