import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})


export class FormDataService {
  user: User = new User();


  saveFormDataSignupForm(formData: any): void {
    this.user = formData;
    localStorage.setItem('data', JSON.stringify(this.user));
  }


  loadFormDataSignupForm(): User {
    let userAsString = localStorage.getItem('data');
    if (userAsString) {
      this.user = JSON.parse(userAsString);
    }
    return this.user;
  }
}
