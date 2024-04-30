import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header-mobile-view',
  standalone: true,
  imports: [],
  templateUrl: './header-mobile-view.component.html',
  styleUrls: ['./header-mobile-view.component.scss', './header-mobile-view.component.media.scss'],
})


export class HeaderMobileViewComponent implements OnInit {
  authService = inject(AuthService);


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
}
