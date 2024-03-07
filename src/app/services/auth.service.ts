import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, confirmPasswordReset, updateProfile, onAuthStateChanged, signOut, deleteUser } from "@angular/fire/auth";
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
    this.loadUserImgUrlService();
  }


  loadUserImgUrlService(): void {
    this.user.imgUrl = localStorage.getItem('userImgUrl');
  }


  saveFormDataSignupFormService(formData: any): void {
    this.removeSelectionsFromAvatarPickerService();
    this.user = formData;
    localStorage.setItem('userData', JSON.stringify(this.user));
  }


  removeSelectionsFromAvatarPickerService(): void {
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


  signupService(userEmail: string | null, userPassword: string): void {
    if (userEmail && userPassword) {
      createUserWithEmailAndPassword(this.auth, userEmail, userPassword)
        .then((userCredential) => {
          this.loadFormDataSignupFormService();
          this.loadUserImgUrlService();
          this.createUserService.createUserService(userCredential.user.uid, this.user);
          this.setUserDataService(userCredential.user);
          this.displayUserFeedbackIfSignupSuccessfullyService();
        })
        .catch((error) => {
          this.displayUserFeedbackIfSignupFailedService();
          console.error(error.message);
        });
    }
  }


  setUserDataService(userCredential: any): void {
    updateProfile(userCredential, { displayName: this.user.name, photoURL: this.user.imgUrl })
      .then(() => {
        this.getDataFromLoggedInUserService();
      })
      .catch((error) => {
        console.error(error.message);
      })
  }


  getDataFromLoggedInUserService(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user.email = user?.email;
        this.user.name = user?.displayName;
        this.user.imgUrl = user?.photoURL;
        this.user.userId = user?.uid;
      }
    });
  }


  updateUserNameService(userCredential: any, formValues: any): void {
    updateProfile(userCredential, { displayName: formValues.name })
      .then(() => {
        this.createUserService.updateUserNameService(userCredential.uid, formValues);
        this.getDataFromLoggedInUserService();
      })
      .catch((error) => {
        console.error(error.message);
      })
  }


  displayUserFeedbackIfSignupSuccessfullyService(): void {
    this.accountIsCreated = true;
    setTimeout(() => {
      this.accountIsCreated = false;
      this.router.navigateByUrl('/login');
      this.removeDataFromLocaleStorageService();
    }, 1400);
  }


  displayUserFeedbackIfSignupFailedService(): void {
    this.accountIsCreatedFailed = true;
    setTimeout(() => {
      this.accountIsCreatedFailed = false;
      this.router.navigateByUrl('/signup');
      this.removeDataFromLocaleStorageService();
    }, 1400);
  }


  removeDataFromLocaleStorageService(): void {
    localStorage.removeItem('userData');
    localStorage.removeItem('userImgUrl');
  }


  loginService(formValues: any): void {
    signInWithEmailAndPassword(this.auth, formValues.email, formValues.password)
      .then((userCredential) => {
        this.user.isOnline = true;
        this.createUserService.updateUserOnlineStatusService(userCredential.user.uid, this.user.isOnline);
        this.saveUserOnlineStatusService();
        this.displayUserFeedbackIfLoginSuccessfullyService();
      })
      .catch((error) => {
        this.displayUserFeedbackIfLoginFailedService();
        console.error('The enterd Email or Password are wrong', error.message);
      });
  }


  saveUserOnlineStatusService(): void {
    localStorage.setItem('userOnlineStatus', JSON.stringify(this.user.isOnline));
  }


  loadUserOnlineStatusService(): void {
    let userOnlineStatusAsString = localStorage.getItem('userOnlineStatus');
    if (userOnlineStatusAsString) {
      this.user.isOnline = JSON.parse(userOnlineStatusAsString);
    }
  }


  removeUserOnlineStatusService(): void {
    localStorage.removeItem('userOnlineStatus');
  }


  displayUserFeedbackIfLoginSuccessfullyService(): void {
    this.loginSuccessfully = true;
    setTimeout(() => {
      this.loginSuccessfully = false;
      this.router.navigateByUrl('/mainView');
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
        this.user.isOnline = true;
        this.saveUserOnlineStatusService();
        this.getDataFromLoggedInUserService();
        this.createUserService.createUserService(userCredential.user.uid, this.user);
        this.createUserService.updateUserOnlineStatusService(this.auth.currentUser?.uid, this.user.isOnline);
        this.displayUserFeedbackIfLoginWithGoogleSuccessfullyService();
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
      this.router.navigateByUrl('/mainView');
    }, 1400)
  }


  loginAsGuestService(): void {
    signInAnonymously(this.auth)
      .then((userCredential) => {
        this.storageService.getRandomAvatarImgForGuestUserService();
        this.updateProfileGuestService(userCredential.user);
        this.displayUserFeedbackIfLoginAsGuestSuccessfullyService();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }


  updateProfileGuestService(userCredential: any): void {
    updateProfile(userCredential, { displayName: 'Guest', photoURL: this.storageService.randomAvatarImageUrl })
      .then(() => {
        this.getDataFromLoggedInUserService();
      })
  }


  displayUserFeedbackIfLoginAsGuestSuccessfullyService(): void {
    this.loginSuccessfully = true;
    setTimeout(() => {
      this.loginSuccessfully = false;
      this.router.navigateByUrl('/mainView');
    }, 1400)
  }


  logoutService(): void {
    this.user.isOnline = false;
    this.createUserService.updateUserOnlineStatusService(this.auth.currentUser?.uid, this.user.isOnline, this.auth.currentUser?.isAnonymous)
      .then(() => {
        this.deleteGuestUserAfterLogoutService();
        return signOut(this.auth);
      })
      .then(() => {
        this.removeUserOnlineStatusService();
        this.router.navigateByUrl('/login');
      })
  }


  deleteGuestUserAfterLogoutService(): void {
    if (this.auth.currentUser?.isAnonymous) {
      deleteUser(this.auth.currentUser);
    }
  }


  deleteUserService(currentUser: any): void {
    deleteUser(currentUser)
      .then(() => {
        this.createUserService.deleteUserService(currentUser.uid);
        this.router.navigateByUrl('/login');
      })
      .catch((error) => {
        console.error(error.message);
      })
  }


  sendMailToResetPasswordService(email: string | null, forgotPasswordForm: any): void {
    if (email) {
      sendPasswordResetEmail(this.auth, email)
        .then(() => {
          localStorage.setItem('userEmail', email);
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