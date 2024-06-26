import { Component, OnInit, inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { RoutingService } from '../../services/routing.service';
import { AuthService } from '../../services/auth.service';
import { UserFeedbackMessageComponent } from '../user-feedback-message/user-feedback-message.component';
import { IntroComponent } from '../intro/intro.component';
import { ButtonCreateAccountMobileViewComponent } from '../button-create-account-mobile-view/button-create-account-mobile-view.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, UserFeedbackMessageComponent, ButtonCreateAccountMobileViewComponent, IntroComponent, ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login.component.media.scss']
})


export class LoginComponent implements OnInit {
  router = inject(Router);
  routingService = inject(RoutingService);
  authService = inject(AuthService);
  introIsHidden: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  ngOnInit(): void {
    this.hideIntro();
    this.routingService.savePreviousUrl(this.router.routerState.snapshot.url);
  }


  hideIntro(): void {
    setTimeout(() => {
      this.introIsHidden = true;
    }, 3280);
  }


  logIn(): void {
    this.authService.loginService(this.loginForm.value);
    this.loginForm.reset();
  }


  loginWithGoogle(): void {
    this.authService.loginWithGoogleService();
  }


  loginAsGuest(): void {
    this.authService.loginAsGuestService();
  }


  inputfieldEmailIsRequired(): boolean {
    return (this.loginForm.controls.email.touched && this.loginForm.controls.email.errors?.['required']) ? true : false;
  }


  inputfieldPasswordIsRequired(): boolean {
    return (this.loginForm.controls.password.touched && this.loginForm.controls.password.errors?.['required']) ? true : false;
  }
}
