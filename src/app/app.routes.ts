import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SignupComponent } from './components/signup/signup.component';
import { AvatarPickerComponent } from './components/avatar-picker/avatar-picker.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { isAuthorizedToGoAvatarpicker } from './router-guards/is-authorized-to-go-Avatarpicker.guard';
import { isAuthorizedToGoResetPassword } from './router-guards/is-authorized-to-go-reset-password.guard';
import { MainViewComponent } from './components/main-view/main-view.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', title: 'DABubble - Login', component: LoginComponent },

    { path: 'legalNotice', title: 'DABubble - Legal notice', component: LegalNoticeComponent },
    { path: 'privacyPolicy', title: 'DABubble - Privacy Policy', component: PrivacyPolicyComponent },

    { path: 'signup', title: 'DABubble - Signup', component: SignupComponent },
    { path: 'avatarPicker', title: 'DABubble - Avatar Picker', component: AvatarPickerComponent, canActivate: [isAuthorizedToGoAvatarpicker] },

    { path: 'forgotPassword', title: 'DABubble - Forgot Password', component: ForgotPasswordComponent },
    { path: 'resetPassword', title: 'DABubble - Reset Password', component: ResetPasswordComponent, canActivate: [isAuthorizedToGoResetPassword] },

    { path: 'mainView', title: 'DABubble - Main View', component: MainViewComponent },

    { path: '**', title: 'DABubble - Page not Found', component: PageNotFoundComponent }
];
