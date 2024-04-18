import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogClose } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-reauthenticate-user',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, MatDialogClose],
  templateUrl: './dialog-reauthenticate-user.component.html',
  styleUrl: './dialog-reauthenticate-user.component.scss'
})


export class DialogReauthenticateUserComponent {
  reauthenticateForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  reauthenticateUser(): void {

  }


  inputfieldEmailIsRequired(): boolean {
    return (this.reauthenticateForm.controls.email.touched && this.reauthenticateForm.controls.email.errors?.['required']) ? true : false;
  }


  inputfieldPasswordIsRequired(): boolean {
    return (this.reauthenticateForm.controls.password.touched && this.reauthenticateForm.controls.password.errors?.['required']) ? true : false;
  }
}
