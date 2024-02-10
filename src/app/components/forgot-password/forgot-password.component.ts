import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { UserFeedbackMessageComponent } from '../user-feedback-message/user-feedback-message.component';
import { FormDataService } from '../../services/form-data.service';
import { RoutingService } from '../../services/routing.service';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FooterComponent, UserFeedbackMessageComponent, ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})


export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/)]),
  });


  constructor(public formDataService: FormDataService, public routingService: RoutingService, public router: Router) {

  }


  ngOnInit(): void {
    this.routingService.savePreviousUrl(this.router.routerState.snapshot.url);
  }


  sendEmailToResetPassword(): void {
    this.formDataService.mailWasSentToResetPassword = true;
    this.forgotPasswordForm.reset();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
      this.formDataService.mailWasSentToResetPassword = false;
    }, 1200);
  }


  inputfieldEmailIsRequired(): boolean {
    return (this.forgotPasswordForm.controls.email.touched && this.forgotPasswordForm.controls.email.errors?.['required']) ? true : false;
  }


  inputfieldEmailIsInvalid(): boolean {
    return (this.forgotPasswordForm.controls.email.errors?.['pattern']) ? true : false;
  }
}
