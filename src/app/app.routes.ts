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
import { ChatDirectMessagesComponent } from './components/chat-direct-messages/chat-direct-messages.component';
import { ChatChannelMessagesComponent } from './components/chat-channel-messages/chat-channel-messages.component';
import { NewMessageComponent } from './components/new-message/new-message.component';
import { ThreadDirectMessageComponent } from './components/thread-direct-message/thread-direct-message.component';
import { WelcomeToDabubbleComponent } from './components/welcome-to-dabubble/welcome-to-dabubble.component';
import { isAutohorizedToGoMainViewGuard } from './router-guards/is-autohorized-to-go-main-view.guard';
import { ThreadChannelMessageComponent } from './components/thread-channel-message/thread-channel-message.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', title: 'DABubble - Login', component: LoginComponent },

    { path: 'legalNotice', title: 'DABubble - Legal notice', component: LegalNoticeComponent },
    { path: 'privacyPolicy', title: 'DABubble - Privacy Policy', component: PrivacyPolicyComponent },

    { path: 'signup', title: 'DABubble - Signup', component: SignupComponent },
    { path: 'avatarPicker', title: 'DABubble - Avatar Picker', component: AvatarPickerComponent, canActivate: [isAuthorizedToGoAvatarpicker] },

    { path: 'forgotPassword', title: 'DABubble - Forgot Password', component: ForgotPasswordComponent },
    { path: 'resetPassword', title: 'DABubble - Reset Password', component: ResetPasswordComponent, canActivate: [isAuthorizedToGoResetPassword] },

    {
        path: 'mainView', title: 'DABubble - Main View', component: MainViewComponent, canActivate: [isAutohorizedToGoMainViewGuard],
        children: [
            {
                path: 'directMessage/:id', component: ChatDirectMessagesComponent, children: [
                    { path: 'thread/:id', component: ThreadDirectMessageComponent },
                ]
            },

            {
                path: 'channel/:id', component: ChatChannelMessagesComponent, children: [
                    { path: 'thread/:id', component: ThreadChannelMessageComponent },
                ]
            },

            { path: 'newMessage', component: NewMessageComponent },

            { path: 'welcomeToDABubble', component: WelcomeToDabubbleComponent },
        ]
    },

    { path: '**', title: 'DABubble - Page not Found', component: PageNotFoundComponent }
];