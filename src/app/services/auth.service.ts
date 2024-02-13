import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@angular/fire/auth";
import { User } from '../models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  auth = inject(Auth);
  router = inject(Router);
  user: User = new User();
  accountIsCreated: boolean = false;
  accountIsCreatedFailed: boolean = false;
  loginSuccessfully: boolean = false;
  loginFailed: boolean = false;
  emailWasSentToResetPassword: boolean = false;
  passwordReseted: boolean = false;


  saveFormDataSignupFormService(formData: any): void {
    this.user = formData;
    localStorage.setItem('userData', JSON.stringify(this.user));
  }


  loadFormDataSignupFormService(): User {
    let userAsString = localStorage.getItem('userData');
    if (userAsString) {
      this.user = JSON.parse(userAsString);
    }
    return this.user;
  }


  signupService(userEmail: string, userPassword: string) {
    createUserWithEmailAndPassword(this.auth, userEmail, userPassword).
      then((userCredential) => {
        this.displayUserFeedbackIfSignupSuccessfullyService();
      })
      .catch((error) => {
        this.displayUserFeedbackIfSignupFailedService();
        console.error(error.message);
      });
  }


  displayUserFeedbackIfSignupSuccessfullyService() {
    this.accountIsCreated = true;
    setTimeout(() => {
      this.accountIsCreated = false;
      this.router.navigateByUrl('/login');
      localStorage.removeItem('userData');
    }, 1400);
  }


  displayUserFeedbackIfSignupFailedService() {
    this.accountIsCreatedFailed = true;
    setTimeout(() => {
      this.accountIsCreatedFailed = false;
      this.router.navigateByUrl('/signup');
      localStorage.removeItem('userData');
    }, 1400);
  }


  loginService(formValues: any) {
    signInWithEmailAndPassword(this.auth, formValues.email, formValues.password)
      .then((userCredential) => {
        this.displayUserFeedbackIfLoginSuccessfullyService();
        console.log(userCredential);
      })
      .catch((error) => {
        this.displayUserFeedbackIfLoginFailedService();
        console.error(error.message);
      });
  }


  displayUserFeedbackIfLoginSuccessfullyService() {
    this.loginSuccessfully = true;
    setTimeout(() => {
      this.loginSuccessfully = false;
    }, 1400)
  }


  displayUserFeedbackIfLoginFailedService() {
    this.loginFailed = true;
    setTimeout(() => {
      this.loginFailed = false;
    }, 1400)
  }
}
