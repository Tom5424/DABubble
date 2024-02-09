import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})


export class FormDataService {
  user: User = new User();
  accountIsCreated: boolean = false;
  mailWasSentToResetPassword: boolean = false;
  passwordReseted: boolean = false;


  saveFormDataSignupForm(formData: any): void {
    this.user = formData;
    localStorage.setItem('userData', JSON.stringify(this.user));
  }


  loadFormDataSignupForm(): User {
    let userAsString = localStorage.getItem('userData');
    if (userAsString) {
      this.user = JSON.parse(userAsString);
    }
    return this.user;
  }
}
