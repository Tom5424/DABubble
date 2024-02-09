import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SignupComponent } from './components/signup/signup.component';
import { AvatarPickerComponent } from './components/avatar-picker/avatar-picker.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', title: 'DABubble - Login', component: LoginComponent },

    { path: 'legalNotice', title: 'DABubble - Legal notice', component: LegalNoticeComponent },
    { path: 'privacyPolicy', title: 'DABubble - Privacy Policy', component: PrivacyPolicyComponent },

    { path: 'signup', title: 'DABubble - Signup', component: SignupComponent },
    { path: 'avatarPicker', title: 'DABubble - Avatar Picker', component: AvatarPickerComponent },
];
