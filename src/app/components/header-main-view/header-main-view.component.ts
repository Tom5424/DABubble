import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileDetailViewComponent } from '../dialog-profile-detail-view/dialog-profile-detail-view.component';


@Component({
  selector: 'app-header-main-view',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './header-main-view.component.html',
  styleUrl: './header-main-view.component.scss'
})


export class HeaderMainViewComponent implements OnInit {
  authService = inject(AuthService);
  matDialog = inject(MatDialog);


  ngOnInit(): void {
    this.authService.getDataFromLoggedInUser();
  }


  loadUserData(): boolean {
    return (!this.authService.user.name && !this.authService.user.imgUrl) ? true : false;
  }


  noProfileImgExist(): boolean {
    return (!this.authService.user.imgUrl) ? true : false;
  }


  openProfileDetailView() {
    this.matDialog.open(DialogProfileDetailViewComponent, { position: { top: '95px', right: '25px' } });
  }


  logout(): void {
    this.authService.logoutService();
  }
}
