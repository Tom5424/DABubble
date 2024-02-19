import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header-main-view',
  standalone: true,
  imports: [],
  templateUrl: './header-main-view.component.html',
  styleUrl: './header-main-view.component.scss'
})


export class HeaderMainViewComponent implements OnInit {
  authService = inject(AuthService);


  ngOnInit(): void {
    this.authService.getDataFromLoggedInUser();
  }


  loadUserData(): boolean {
    return (!this.authService.user.name && !this.authService.user.imgUrl) ? true : false;
  }


  noProfileImgExist(): boolean {
    return (!this.authService.user.imgUrl) ? true : false;
  }
}
