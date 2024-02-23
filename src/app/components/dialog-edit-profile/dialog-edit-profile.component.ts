import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-dialog-edit-profile',
  standalone: true,
  imports: [MatDialogClose, ReactiveFormsModule, NgClass],
  templateUrl: './dialog-edit-profile.component.html',
  styleUrl: './dialog-edit-profile.component.scss'
})


export class DialogEditProfileComponent implements OnInit {
  authService = inject(AuthService);
  matDialog = inject(MatDialog);


  editProfileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    // email: new FormControl('', Validators.required),
  });


  ngOnInit(): void {
    this.authService.getDataFromLoggedInUserService();
  }


  inputfieldNameIsRequired(): boolean {
    return (this.editProfileForm.controls.name.touched && this.editProfileForm.controls.name.errors?.['required']) ? true : false;
  }


  inputfieldNameIsToShort(): boolean {
    return (this.editProfileForm.controls.name.errors?.['minlength']) ? true : false;
  }


  inputfieldNameIsToLong(): boolean {
    return (this.editProfileForm.controls.name.errors?.['maxlength']) ? true : false;
  }


  updateUserName() {
    this.authService.updateUserNameService(this.authService.auth.currentUser, this.editProfileForm.value);
    this.matDialog.closeAll();
  }
}
