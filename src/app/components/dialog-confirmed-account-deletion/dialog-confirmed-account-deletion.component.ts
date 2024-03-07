import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { DialogAccountDeletedComponent } from '../dialog-account-deleted/dialog-account-deleted.component';


@Component({
  selector: 'app-dialog-confirmed-account-deletion',
  standalone: true,
  imports: [MatDialogClose],
  templateUrl: './dialog-confirmed-account-deletion.component.html',
  styleUrl: './dialog-confirmed-account-deletion.component.scss'
})


export class DialogConfirmedAccountDeletionComponent {
  authService = inject(AuthService);
  matDialog = inject(MatDialog);


  deleteAccount(): void {
    this.authService.deleteUserService(this.authService.auth.currentUser);
    this.matDialog.closeAll();
    setTimeout(() => {
      this.matDialog.open(DialogAccountDeletedComponent);
    }, 850);
  }
}
