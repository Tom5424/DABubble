import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FooterComponent, ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})


export class ForgotPasswordComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/)]),
  });


  sendMailToResetPassword() {

  }


  inputfieldEmailIsRequired(): boolean {
    return (this.forgotPasswordForm.controls.email.touched && this.forgotPasswordForm.controls.email.errors?.['required']) ? true : false;
  }


  inputfieldEmailIsInvalid(): boolean {
    return (this.forgotPasswordForm.controls.email.errors?.['pattern']) ? true : false;
  }
}
