import { Component, OnInit, inject } from '@angular/core';
import { MatDialogClose } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dialog-profile-detail-view',
  standalone: true,
  imports: [MatDialogClose],
  templateUrl: './dialog-profile-detail-view.component.html',
  styleUrl: './dialog-profile-detail-view.component.scss'
})


export class DialogProfileDetailViewComponent implements OnInit {
  authService = inject(AuthService);


  ngOnInit(): void {
    this.authService.getDataFromLoggedInUser();
  }
}
