import { Component, OnInit, inject } from '@angular/core';
import { MatDialogClose } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dialog-edit-profile',
  standalone: true,
  imports: [MatDialogClose],
  templateUrl: './dialog-edit-profile.component.html',
  styleUrl: './dialog-edit-profile.component.scss'
})


export class DialogEditProfileComponent implements OnInit {
  authService = inject(AuthService);


  ngOnInit(): void {
    this.authService.getDataFromLoggedInUser();
  }
}
