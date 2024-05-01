import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { DialogProfileDetailViewComponent } from '../dialog-profile-detail-view/dialog-profile-detail-view.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header-mobile-view',
  standalone: true,
  imports: [MatMenuModule, RouterLink],
  templateUrl: './header-mobile-view.component.html',
  styleUrls: ['./header-mobile-view.component.scss', './header-mobile-view.component.media.scss'],
})


export class HeaderMobileViewComponent implements OnInit {
  authService = inject(AuthService);
  matDialog = inject(MatDialog);


  ngOnInit(): void {
    this.authService.getDataFromLoggedInUserService();
    this.authService.loadUserOnlineStatusService();
  }


  noProfileImgExist(): boolean {
    return (!this.authService.user.imgUrl) ? true : false;
  }


  userDataLoading(): boolean {
    return (!this.authService.user.name && !this.authService.user.imgUrl) ? true : false;
  }


  guestUserIsLoggedIn(): boolean {
    return (this.authService.auth.currentUser?.isAnonymous) ? true : false;
  }


  userIsOnline(): boolean {
    return (this.authService.user.isOnline) ? true : false;
  }


  openProfileDetailView(): void {
    this.matDialog.open(DialogProfileDetailViewComponent, { position: { top: '95px', right: '25px' } });
  }


  logout(): void {
    this.authService.logoutService();
  }
}