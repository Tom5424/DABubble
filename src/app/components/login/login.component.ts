import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { RoutingService } from '../../services/routing.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  constructor(public router: Router, public routingService: RoutingService) {

  }


  ngOnInit(): void {
    this.routingService.savePreviousUrl(this.router.routerState.snapshot.url);
  }


  logIn() {

  }


  inputfieldEmailIsRequired(): boolean {
    return (this.loginForm.controls.email.touched && this.loginForm.controls.email.errors?.['required']) ? true : false;
  }


  inputfieldPasswordIsRequired(): boolean {
    return (this.loginForm.controls.password.touched && this.loginForm.controls.password.errors?.['required']) ? true : false;
  }
}
