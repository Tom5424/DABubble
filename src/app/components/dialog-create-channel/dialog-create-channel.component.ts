import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogClose } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-create-channel',
  standalone: true,
  imports: [MatDialogClose, ReactiveFormsModule, NgClass],
  templateUrl: './dialog-create-channel.component.html',
  styleUrl: './dialog-create-channel.component.scss'
})


export class DialogCreateChannelComponent {
  createChannelForm = new FormGroup({
    channelName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    channelDescription: new FormControl('', Validators.maxLength(150)),
  })


  inputFieldChannelNameIsRequired(): boolean {
    return (this.createChannelForm.controls.channelName.touched && this.createChannelForm.controls.channelName.errors?.['required']) ? true : false;
  }


  inputfieldChannelNameIsToShort(): boolean {
    return (this.createChannelForm.controls.channelName.errors?.['minlength']) ? true : false;
  }


  inputfieldChannelNameIsToLong(): boolean {
    return (this.createChannelForm.controls.channelName.errors?.['maxlength']) ? true : false;
  }


  inputfieldChannelDescriptionIsToLong(): boolean {
    return (this.createChannelForm.controls.channelDescription.errors?.['maxlength']) ? true : false;
  }


  openDialogAddPeople() {

  }
}
