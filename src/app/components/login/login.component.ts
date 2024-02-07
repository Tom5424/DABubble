import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  logIn() {

  }


  inputfieldEmailIsRequired(): boolean {
    return (this.loginForm.controls.email.touched && this.loginForm.controls.email.errors?.['required']) ? true : false;
  }


  inputfieldPasswordIsRequired(): boolean {
    return (this.loginForm.controls.password.touched && this.loginForm.controls.password.errors?.['required']) ? true : false;
  }
}
