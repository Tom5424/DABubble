import { Component, OnInit, inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { UserFeedbackMessageComponent } from '../user-feedback-message/user-feedback-message.component';
import { RoutingService } from '../../services/routing.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FooterComponent, UserFeedbackMessageComponent, ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})


export class ForgotPasswordComponent implements OnInit {
  authService = inject(AuthService);
  routingService = inject(RoutingService);
  router = inject(Router);
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/)]),
  });


  ngOnInit(): void {
    this.routingService.savePreviousUrl(this.router.routerState.snapshot.url);
  }


  sendEmailToResetPassword(): void {
    this.authService.sendMailToResetPasswordService(this.forgotPasswordForm.controls.email.value, this.forgotPasswordForm);
  }


  inputfieldEmailIsRequired(): boolean {
    return (this.forgotPasswordForm.controls.email.touched && this.forgotPasswordForm.controls.email.errors?.['required']) ? true : false;
  }


  inputfieldEmailIsInvalid(): boolean {
    return (this.forgotPasswordForm.controls.email.errors?.['pattern']) ? true : false;
  }
}
