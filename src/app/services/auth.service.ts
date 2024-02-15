import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, confirmPasswordReset } from "@angular/fire/auth";
import { User } from '../models/user';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { CreateUserService } from './create-user.service';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  storageService = inject(StorageService);
  createUserService = inject(CreateUserService);
  auth = inject(Auth);
  router = inject(Router);
  user: User = new User();
  accountIsCreated: boolean = false;
  accountIsCreatedFailed: boolean = false;
  loginSuccessfully: boolean = false;
  loginFailed: boolean = false;
  emailWasSentToResetPassword: boolean = false;
  passwordReseted: boolean = false;
  codeToResetPassword: string = '';


  saveUserImgUrl(selectedImageAvatarUrl: string, urlFromUploadedImg: string): void {
    if (selectedImageAvatarUrl) {
      localStorage.setItem('userImgUrl', selectedImageAvatarUrl);
    } else if (urlFromUploadedImg) {
      localStorage.setItem('userImgUrl', urlFromUploadedImg);
    }
    this.user.imgUrl = localStorage.getItem('userImgUrl');
  }


  saveFormDataSignupFormService(formData: any): void {
    this.removeSelectionsFromAvatarPicker();
    this.user = formData;
    localStorage.setItem('userData', JSON.stringify(this.user));
  }


  removeSelectionsFromAvatarPicker() {
    this.storageService.selectedImageAvatarUrl = '';
    this.storageService.urlFromUploadedImg = '';
    this.storageService.uploadImg = false;
    this.storageService.imgIsUploaded = false;
  }


  loadFormDataSignupFormService(): User {
    let userAsString = localStorage.getItem('userData');
    if (userAsString) {
      this.user = JSON.parse(userAsString);
    }
    return this.user;
  }


  signupService(userEmail: string, userPassword: string): void {
    createUserWithEmailAndPassword(this.auth, userEmail, userPassword).
      then((userCredential) => {
        this.createUserService.createUserService(this.user);
        this.displayUserFeedbackIfSignupSuccessfullyService();
      })
      .catch((error) => {
        this.displayUserFeedbackIfSignupFailedService();
        console.error(error.message);
      });
  }


  displayUserFeedbackIfSignupSuccessfullyService(): void {
    this.accountIsCreated = true;
    setTimeout(() => {
      this.accountIsCreated = false;
      this.router.navigateByUrl('/login');
      localStorage.removeItem('userData');
      localStorage.removeItem('userImgUrl');
    }, 1400);
  }


  displayUserFeedbackIfSignupFailedService(): void {
    this.accountIsCreatedFailed = true;
    setTimeout(() => {
      this.accountIsCreatedFailed = false;
      this.router.navigateByUrl('/signup');
      localStorage.removeItem('userData');
      localStorage.removeItem('userImgUrl');
    }, 1400);
  }


  loginService(formValues: any): void {
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


  displayUserFeedbackIfLoginSuccessfullyService(): void {
    this.loginSuccessfully = true;
    setTimeout(() => {
      this.loginSuccessfully = false;
    }, 1400)
  }


  displayUserFeedbackIfLoginFailedService(): void {
    this.loginFailed = true;
    setTimeout(() => {
      this.loginFailed = false;
    }, 1400)
  }


  loginWithGoogleService(): void {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(this.auth, googleProvider)
      .then((userCredential) => {
        this.displayUserFeedbackIfLoginWithGoogleSuccessfullyService();
        console.log(userCredential);
      })
      .catch((error) => {
        console.error('Error Message', error.message);
        console.error('Used Email', error.customData.email);
        console.error('AuthCredential type', GoogleAuthProvider.credentialFromError(error));
      })
  }


  displayUserFeedbackIfLoginWithGoogleSuccessfullyService(): void {
    this.loginSuccessfully = true;
    setTimeout(() => {
      this.loginSuccessfully = false;
    }, 1400)
  }


  loginAsGuestService(): void {
    signInAnonymously(this.auth)
      .then((userCredential) => {
        this.displayUserFeedbackIfLoginAsGuestSuccessfullyService();
        console.log(userCredential);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }


  displayUserFeedbackIfLoginAsGuestSuccessfullyService(): void {
    this.loginSuccessfully = true;
    setTimeout(() => {
      this.loginSuccessfully = false;
    }, 1400)
  }


  sendMailToResetPasswordService(email: string | null, forgotPasswordForm: any): void {
    if (email) {
      sendPasswordResetEmail(this.auth, email)
        .then(() => {
          this.emailWasSentToResetPassword = true;
          forgotPasswordForm.reset();
        })
        .catch((error) => {
          console.error(error.message);
        });
      this.displayUserFeedbackIfEmailSentToResetPasswordService();
    }
  }


  displayUserFeedbackIfEmailSentToResetPasswordService(): void {
    setTimeout(() => {
      this.emailWasSentToResetPassword = false;
      this.router.navigateByUrl('/login');
    }, 1400);
  }


  resetPasswordService(newPassword: string | null, resetPasswordForm: any): void {
    if (newPassword) {
      confirmPasswordReset(this.auth, this.codeToResetPassword, newPassword)
        .then(() => {
          this.passwordReseted = true;
          resetPasswordForm.reset();
        })
    }
    this.displayUserFeedbackIfPasswordResetedService();
  }


  displayUserFeedbackIfPasswordResetedService(): void {
    setTimeout(() => {
      this.router.navigateByUrl('/login');
      this.passwordReseted = false;
    }, 1400);
  }
}
