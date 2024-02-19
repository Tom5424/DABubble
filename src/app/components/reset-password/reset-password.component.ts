import { Component, OnInit, inject } from '@angular/core';
import { UserFeedbackMessageComponent } from '../user-feedback-message/user-feedback-message.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [HeaderComponent, UserFeedbackMessageComponent, ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})


export class ResetPasswordComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  resetPasswordForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(50)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(50)]),
  });


  ngOnInit(): void {
    this.authService.codeToResetPassword = this.activatedRoute.snapshot.queryParams['oobCode'];  // Extract the reset code from the active route to reset the password.
  }


  resetPassword(): void {
    this.authService.resetPasswordService(this.resetPasswordForm.controls.newPassword.value, this.resetPasswordForm);
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


  newPasswordNotMatcheWithConfirmedPassword(): boolean {
    return (this.resetPasswordForm.controls.newPassword.value !== this.resetPasswordForm.controls.confirmPassword.value) ? true : false;
  }
}